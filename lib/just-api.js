'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const Suite = require('./suite');
const Launcher = require('./launcher');
const LocalServer = require('./local-server');
const { isNumber } = require('./utils');

const MAX_PARALLEL_LIMIT = 24;

module.exports = class JustAPI {

    constructor(suiteFiles, options) {
        this.suites = suiteFiles;
        this.options = options;
        this.max_parallel_limit = MAX_PARALLEL_LIMIT;
    }

    init() {

        if (!this.suites.length) {
            console.error('No test suites found');
            process.exit(1);
        } else {
            this.files = this.suites.map(suite => path.resolve(suite));
            let files = this.files.map(file => `  - ${file}`);
            console.info(`Found suites:\n${files.join('\n')}`);
        }

        this.setupReporters(this.options.reporter);
        this.setReporterOptions(this.options.reporterOptions);
        this.configureParallelism(this.options.parallel);
        this.configurePatternMatching(this.options.grep);

        const launcherOptions = {
            parallel: this.parallel,
            max_parallel: this.max_parallel,
            max_parallel_limit: this.max_parallel_limit,
            grep: this.grep,
            reporters: this.reporters,
            reporterOptions: this.reporterOptions
        };


        const launcher = new Launcher(this.files, launcherOptions);

        if (this.options.runServer) {
            const server = new LocalServer();
            server.on('start', () => launcher.go());
            server.start();
            launcher.on('end', () => server.stop());
        } else {
            launcher.go();
        }

    }

    setupReporters(input) {
        this.reporters = [];

        const reporterIdentified = input || 'specs';
        let chosenReporters = reporterIdentified.split(',');

        if (!chosenReporters.includes('specs')) {
            chosenReporters.push('specs')
        }

        chosenReporters = Array.from(new Set(chosenReporters));

        for (let reporterInput of chosenReporters) {
            let Reporter;

            switch (reporterInput.trim()) {
                case 'specs':
                    Reporter = require('./reporters/specs.js');
                    break;
                case 'html':
                    Reporter = require('./reporters/html.js');
                    break;
                case 'json':
                    Reporter = require('./reporters/json.js');
                    break;
                default:
                    try {
                        Reporter = require(reporterInput.trim());
                        break;
                    } catch (err) {
                        console.error(`\nError occurred while loading the reporter: ${reporterInput.trim()}`);
                        console.error(`\n  ${err.stack}`);
                        process.exit(1);
                    }
            }

            this.reporters.push(Reporter);
        }

    }

    setReporterOptions(input) {
        this.reporterOptions = {};

        if (input !== undefined) {
            let options = input.split(',');

            for (let option of options) {
                const item = option.split('=');

                if (item.length > 2 || item.length === 0) {
                    throw new Error(`invalid reporter option '${option}'`);
                } else if (item.length === 2) {
                    this.reporterOptions[item[0]] = item[1];
                } else {
                    this.reporterOptions[item[0]] = true;
                }
            }
        }
    }

    configureParallelism(input) {
        const userInputForParallelism = input;

        if (userInputForParallelism) {
            if (isNumber(userInputForParallelism) && parseInt(userInputForParallelism) > 1 && parseInt(userInputForParallelism) <= MAX_PARALLEL_LIMIT) {
                this.parallel = true;
                this.max_parallel = parseInt(userInputForParallelism);
            } else {
                console.error(`Given argument for parallel option ${input} is invalid, Please provide a number (> 1 and <= ${MAX_PARALLEL_LIMIT})`);
                process.exit(1);
            }
        } else {
            this.parallel = false;
            this.max_parallel = 1;
        }
    }

    configurePatternMatching(input) {
        const grepRegexInput = input;

        if (grepRegexInput) {
            if (typeof grepRegexInput === 'string') {
                let arg = grepRegexInput.match(/^\/(.*)\/(g|i|)$|.*/);
                this.grep = new RegExp(arg[1] || arg[0], arg[2]);
            } else {
                this.grep = grepRegexInput;
            }
        }

    }
}