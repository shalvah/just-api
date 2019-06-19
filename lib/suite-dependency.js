const fs = require('fs');
const path = require('path');
const { customError } = require('./errors');

module.exports = class SuiteDependency {

    constructor(filePath, parent) {
        this.file = filePath;
        this.parent = parent;
        this.targetConfiguration = {};
        this.commonHeaders = {};
    }

    loadFileAndValidateSchema() {
        this.parent.loadFileAndValidateSchema.call(this);
    }

    loadFile(file) {
        if (!fs.existsSync(file)) {
            let FileDoesNotExistError = customError('FileDoesNotExist');
            throw new FileDoesNotExistError(`Test suite file doesn't exist at '${file}'`);
        }

        try {
            return require(file);
        } catch (err) {
            let YAMLSuiteLoadingError = customError('YAMLSuiteLoadingError');
            throw new YAMLSuiteLoadingError(`(${file}) \n ${err.message}`);
        }
    }

    resolveFile(filePath) {
        return this.parent.resolveFile.call(this, filePath);
    }

    async configure() {
        await this.parent.configure.call(this);
    }
}