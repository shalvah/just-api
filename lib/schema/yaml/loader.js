const yaml = require('js-yaml');
const fs = require('fs');

const {asyncFunction} = require('./custom-types');
const { NotAValidYAMLCustomType } = require('./../../errors');


function getCustomYAMLSchema(customType) {
    let yamlType;

    switch (customType) {
        case 'asyncFunction':
            yamlType = asyncFunction();
            break;
        default:
            throw new NotAValidYAMLCustomType(`${customType} is not a valid custom YAML type`);
    }

    return yamlType;
}

module.exports = {
    loadYAML(filePath, options) {
        let customSchema;

        if (options.customTypes) {
            let typeDefinitions = [];

            for (let type of options.customTypes) {
                typeDefinitions.push(getCustomYAMLSchema(type));
            }

            customSchema = yaml.Schema.create(typeDefinitions);
        }

        try {
            return yaml.load(fs.readFileSync(filePath, {encoding: options.encoding}), {schema: customSchema})
        } catch (err) {
            throw err;
        }
    }
};