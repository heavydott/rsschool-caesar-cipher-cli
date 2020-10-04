const {validateArgs, getInputFile, getOutputFile} = require('./modules/validator.js');
const {dataTransformation} = require('./modules/data-transformation.js');

validateArgs();
dataTransformation(getInputFile(), getOutputFile());
