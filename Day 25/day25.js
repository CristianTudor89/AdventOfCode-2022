const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'day25.txt'), 'utf8').toString().trim().split('\r\n')

function SnafuToDecimal(snafuNumber)
{
    let number = 0;

    for (let i = 0; i < snafuNumber.length; i++)
    {
        let amount = 0;

        if (snafuNumber[i] == '1' || snafuNumber[i] == '2')
            amount = parseInt(snafuNumber[i], 10);
        else if (snafuNumber[i] == '-')
            amount = -1;
        else if (snafuNumber[i] == '=')
            amount = -2;
        
        number += amount * Math.pow(5, snafuNumber.length - i - 1);
    }

    return number;
}

function DecimalToSnafu(decNumber)
{
    if (decNumber == 0)
        return '';

    if (decNumber % 5 == 0)
        return DecimalToSnafu(Math.floor(decNumber / 5)) + '0';
    else if (decNumber % 5 == 1)
        return DecimalToSnafu(Math.floor(decNumber / 5)) + '1';
    else if (decNumber % 5 == 2)
        return DecimalToSnafu(Math.floor(decNumber / 5)) + '2';
    else if (decNumber % 5 == 3)
        return DecimalToSnafu((Math.floor(decNumber / 5) + 1)) + '=';
    else if (decNumber % 5 == 4)
        return DecimalToSnafu((Math.floor(decNumber / 5) + 1)) + '-';

    return '';
}

let sum = 0;

for (line of input)
{
    let decimalNumber = SnafuToDecimal(line);

    sum += decimalNumber;
}

console.log(sum);
console.log(DecimalToSnafu(sum));
