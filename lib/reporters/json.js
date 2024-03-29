'use strict';

const fs = require('fs');
const path = require('path');
const serializeError = require('serialize-error');
const { doesDirectoryExist } = require('./../utils');

module.exports = class JSONReporter {

    constructor(launcher, opts = {}) {
        this.launcher = launcher;
        this.isParallelRun = opts.parallel;
        this.reporterOptions = opts.reporterOptions;

        this.result = {
            title: 'just-api',
            files: [],
            passedSuitesCount: 0,
            skippedSuitesCount: 0,
            failedSuitesCount: 0,
            failedTestsCount: 0,
            passedTestsCount: 0,
            skippedTestsCount: 0
        };

        this.suites = [];
        this.start = process._api.startTime || new Date();
        let self = this;

        launcher.on('start', function (suiteFiles) {
            self.result.files = suiteFiles.slice(0);
        });

        launcher.on('end', function () {
            self.end = new Date();
            self.result.duration = self.end.getTime() - self.start.getTime();
            self.result.suites = self.suites;

            try {
                let outputDirectory = this.reporterOptions.jsonReportDir || '.justapi_reports';

                if (!doesDirectoryExist(outputDirectory)) {
                    fs.mkdirSync(outputDirectory);
                }

                let outputFile = this.reporterOptions.jsonReportName ? this.reporterOptions.jsonReportName + '.json' : 'report.json';
                const reportPath = path.resolve(process.cwd(), outputDirectory, outputFile);
                fs.writeFileSync(reportPath, JSON.stringify(self.result, null, 2), 'utf-8');

                console.log(`\nJSON report is written to "${reportPath}"`);
            } catch (err) {
                console.error(err);
            }
        });

        launcher.on('new suite', function (suite) {
            self.addSuite(suite)
        });
    }

    addSuite(suite) {
        let self = this;

        self.suites.push({
            location: suite.file,
            name: '',
            status: null,
            tests: [],
            passedTests: 0,
            skippedTests: 0,
            failedTests: 0,
            error: null
        });

        suite.on('test pass', function (test) {
            let suite = self.getSuite(test.suite.file);

            let currentTest = {
                suite: test.suite.file,
                name: test.name,
                duration: test.duration,
                status: 'pass',
                error: null
            };

            suite.tests.push(currentTest);
            suite.passedTests++;
            self.result.passedTestsCount++;
        });

        suite.on('test fail', function (test, error) {
            let suite = self.getSuite(test.suite.file);

            let currentTest = {
                suite: test.suite.file,
                name: test.name,
                duration: test.duration,
                status: 'fail',
                error: error ? serializeError(error) : null
            };

            if (self.reporterOptions.logRequests) {
                try {
                    if (test.requests && test.requests.length) {
                        let requestsLog = [];

                        for (let loggedRequestResponse of test.requests) {
                            requestsLog.push(loggedRequestResponse);
                        }
                        currentTest.requests = requestsLog;
                    }
                } catch (e) {

                }
            }

            suite.tests.push(currentTest);
            suite.failedTests++;
            self.result.failedTestsCount++;
        });

        suite.on('test skip', function (test) {
            let suite = self.getSuite(test.suite.file);

            let currentTest = {
                suite: test.suite.file,
                name: test.name,
                duration: test.duration,
                status: 'skip',
                error: null
            };

            suite.tests.push(currentTest);
            suite.skippedTests++;
            self.result.skippedTestsCount++;
        });

        suite.on('end', function (suite, error) {
            let suiteResultObject = self.getSuite(suite.file);

            suiteResultObject.status = suite.status;

            if (suite.status === 'fail') {
                suiteResultObject.error = error ? serializeError(error) : null;

                if (self.reporterOptions.logRequests) {
                    try {
                        if (suite.requests && suite.requests.length) {
                            let requestsLog = [];

                            for (let loggedRequestResponse of suite.requests) {
                                requestsLog.push(loggedRequestResponse);
                            }

                            suiteResultObject.requests = requestsLog;
                        } else {
                            suiteResultObject.requests = [];
                        }
                    } catch (e) {

                    }
                }

                self.result.failedSuitesCount++;
            } else if (suite.status === 'pass') {
                self.result.passedSuitesCount++;
            } else if (suite.status === 'skip') {
                self.result.skippedSuitesCount++;
            }

            if (suite.name && suite.name.length > 0) {
                suiteResultObject.name = suite.name;
            }

        });
    }

    getSuite(location) {
        return this.suites.find(function (suiteObj) {
            return suiteObj.location === location;
        });
    }

}