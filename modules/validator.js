const args = require('minimist')(process.argv.slice(2));

const ACTION = ['a', 'action']; // the required param
const SHIFT = ['s', 'shift']; // the required param
const INPUT_FILE = ['i', 'input'];
const OUTPUT_FILE = ['o', 'output'];

const errorHandler = (err) => {
    if(err) {
        process.stderr.write(err.message + '\n');
        process.exit(1);
    }
};

const getAction = () => {
    return args[ACTION[0]] || args[ACTION[1]];
};

const getShift = () => {
    return args[SHIFT[0]] || args[SHIFT[1]];
};

const getInputFile = () => {
    return args[INPUT_FILE[0]] || args[INPUT_FILE[1]];
};

const getOutputFile = () => {
    return args[OUTPUT_FILE[0]] || args[OUTPUT_FILE[1]];
};

const validateArgs = () => {
    if(!getAction()) {
        errorHandler(new Error('argument -action is missing'));
    }
    if(!getShift()) {
        errorHandler(new Error('argument -shift is missing'));
    }
    const fs = require('fs');
    let inputFilePath = getInputFile();
    if(inputFilePath) {
        fs.access(inputFilePath, fs.constants.R_OK, err => errorHandler(err));
    }
    let outputFilePath = getOutputFile();
    if(outputFilePath) {
        fs.access(outputFilePath, fs.constants.W_OK, err => errorHandler(err));
    }
};

module.exports = {
    getAction,
    getShift,
    getInputFile,
    getOutputFile,
    validateArgs
};
