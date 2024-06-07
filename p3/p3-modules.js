// Project: CIT 281 Project 3
// Author: Tyler Startin

const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];

function validDenomination(coin) {
    return [1, 5, 10, 25, 50, 100].indexOf(coin) !== -1;
}

function valueFromCoinObject(obj) {
    const { denom = 0, count = 0 } = obj;
    return denom * count;
}

function valueFromArray(arr) {
    return arr.reduce((total, obj) => total + valueFromCoinObject(obj), 0);
}

function coinCount(...coinage) {
// Got help from Chat GPT in handling invalid denominations. Chat GPT gave me a for...of loop, I used that as a basis to
// construct the basic for loop below.  Iterates through coinage parameter to check if validDenomination is true or false
// if false, print error message, if true, print value from the calculation.
    for (let i = 0; i < coinage.length; i++) {
        const { denom } = coinage[i];
        if (!validDenomination(denom)) {
            return `Invalid denomination: ${denom}`;
        }
    };

    return valueFromArray(coinage);
}

//Export coinCount
module.exports = {coinCount, coins};
