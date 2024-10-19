import { currencyMappings, words } from './commonData.js';

const Rs = (amount) => {
    let words_string = "";
    amount = amount.toString();
    let atemp = amount.split(".");
    let number = atemp[0].split(",").join("");
    let n_length = number.length;

    if (n_length <= 9) {
        let n_array = new Array(9).fill(0);
        let received_n_array = Array.from(number).map(Number);
        for (let i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }

        for (let i = 0; i < 9; i++) {
            if (i === 0 || i === 2 || i === 4 || i === 7) {
                if (n_array[i] === 1) {
                    n_array[i + 1] = 10 + n_array[i + 1];
                    n_array[i] = 0;
                }
            }
        }

        for (let i = 0; i < 9; i++) {
            let value;
            if (i === 0 || i === 2 || i === 4 || i === 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }

            if (value > 0) {
                if (value <= 20) {
                    words_string += words[value] + " ";
                } else {
                    words_string += words[20 + (value / 10) - 2] + " ";
                }
            }

            if ((i === 1 && value > 0) || (i === 0 && value > 0 && n_array[i + 1] === 0)) {
                words_string += "Crores ";
            }
            if ((i === 3 && value > 0) || (i === 2 && value > 0 && n_array[i + 1] === 0)) {
                words_string += "Lakhs ";
            }
            if ((i === 5 && value > 0) || (i === 4 && value > 0 && n_array[i + 1] === 0)) {
                words_string += "Thousand ";
            }
            if (i === 6 && value > 0 && n_array[i + 1] > 0) {
                words_string += "Hundred and ";
            } else if (i === 6 && value > 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.trim();
    }
    return words_string;
};


 const digitToWordsConverter = async (number,country) => {
    if (!currencyMappings[country]) {
        throw new Error(`Invalid country name: "${country}". Please enter a valid country name.`);
    }
    
    const { currency: currencyName, fractional: fractionalName } = currencyMappings[country] || {};


    let nums = number.toString().split(".");
    let whole = Rs(nums[0]);
    let fraction = "";

    if (nums.length === 2) {
        let fractionalPart = parseInt(nums[1].padEnd(2, "0").substring(0, 2), 10);
        if (fractionalPart > 0) {
            fraction = Rs(fractionalPart);
        }
    }

    let op = "";
    if (whole === "" && fraction === "") {
        op = `Zero ${currencyName} only`;
    } else if (whole === "" && fraction !== "") {
        op = `${fraction} ${fractionalName} only`;
    } else if (whole !== "" && fraction === "") {
        op = `${whole} ${currencyName} only`;
    } else if (whole !== "" && fraction !== "") {
        op = `${whole} ${currencyName} and ${fraction} ${fractionalName} only`;
    }


    return op;
};

export  {digitToWordsConverter}