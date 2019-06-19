const {validate: validateSchema} = require('jsonschema');
const fs = require('fs');

module.exports = {
    validateJSONSchema(dataObject, schemaFilePath) {
        const expectedSchema = JSON.parse(fs.readFileSync(schemaFilePath, 'utf8'));

        return validateSchema(dataObject, expectedSchema);
    }
};