const fs = require('fs');
const {pipeline} = require('stream');
const {encryptor} = require('./stream.js');

const dataTransformation = (inputFilePath, outputFilePath) => {
    let source;
    let target;
    if(inputFilePath) {
        source = fs.createReadStream(inputFilePath);
    } else {
        source = process.stdin;
    }
    if(outputFilePath) {
        target = fs.createWriteStream(outputFilePath, {flags: 'a'});
    } else {
        target = process.stdout;
    }
    pipeline(source, encryptor, target, err => {
        if(err) {
            process.stderr.write(err.message + '\n');
            process.exit(1);
        }
    });
};

module.exports = {dataTransformation}
