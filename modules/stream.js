const {getAction, getShift} = require('./validator.js');
const {encrypt} = require('./crypto-grapher.js');

const stream = require('stream');
const encryptor = new stream.Transform({objectMode: true});

encryptor._transform = (chunk, encoding, done) => {
    try {
        done(null, encrypt(chunk.toString(), getShift(), getAction));
    } catch(err) {
        done(err);
    }
};

module.exports = {encryptor};
