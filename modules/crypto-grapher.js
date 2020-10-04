const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const ENCRYPTION = 'encode';

const encrypt = (text, shift, mode = ENCRYPTION) => {
    if(mode !== ENCRYPTION) {
        shift *= -1;
    }
    return text.split('').map(letter => {
        const lowerCaseLetter = letter.toLowerCase();

        const i = alphabet.indexOf(lowerCaseLetter);
        if(i >= 0) {
            const isUpper = letter !== lowerCaseLetter;
            let shiftI = (i + shift) % alphabet.length;
            if (shiftI < 0) {
                shiftI += alphabet.length;
            }
            let newLetter = alphabet[shiftI];
            if(isUpper) {
                newLetter = newLetter.toUpperCase();
            }
            return newLetter;
        } else {
            return letter;
        }
    }).join('');
};

module.exports = {encrypt};
