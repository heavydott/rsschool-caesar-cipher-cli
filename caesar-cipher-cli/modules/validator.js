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
    if(typeof(args[ACTION[0]]) !== 'string' && typeof(args[ACTION[1]]) !== 'string') {
        errorHandler(new Error('value of argument -action is missing'));
    }
    return args[ACTION[0]] || args[ACTION[1]];
};

const getShift = () => {
    if(typeof(args[SHIFT[0]]) !== 'number' && typeof(args[SHIFT[1]]) !== 'number') {
        errorHandler(new Error('value of argument -shift is missing'));
    }
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
        fs.access(inputFilePath, fs.constants.F_OK, err => {
            if(err) {
                errorHandler(new Error('does not exist input file'));
            }
        });
        fs.access(inputFilePath, fs.constants.R_OK, err => {
            if(err) {
                errorHandler(new Error('input file do not readable'));
            }
        });
    }
    let outputFilePath = getOutputFile();
    if(outputFilePath) {
        fs.access(outputFilePath, fs.constants.F_OK, err => {
            if(err) {
                errorHandler(new Error('does not exist output file'));
            }
        });
        fs.access(outputFilePath, fs.constants.W_OK, err => {
            if(err) {
                errorHandler(new Error('output file do not readable'));
            }
        });
    }
};

module.exports = {
    getAction,
    getShift,
    getInputFile,
    getOutputFile,
    validateArgs
};
