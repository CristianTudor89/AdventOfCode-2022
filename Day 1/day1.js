const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'day1.txt'), 'utf8')
                .toString()
                .trim()
	            .split('\n')
	            .map((num) => parseInt(num, 10));
               
// Part 1
let maxSum = 0;
let sum = 0;

for (let number of input) 
{
    if (isNaN(number))
    {
        if (sum > maxSum)
           maxSum = sum;

        sum = 0;
    }
    else
        sum += number;
}

console.log(maxSum);

// Part 2
let totalSum = 0;
let maxSums = [];

for (let i = 0; i < 3; i++)
{
    let maxSum = 0;
    let sum = 0;

    for (let number of input) 
    {
        if (isNaN(number))
        {
            if (sum > maxSum)
            {
                if (!maxSums.includes(sum))
                    maxSum = sum;
            }

            sum = 0;
        }
        else
            sum += number;
    }

    maxSums.push(maxSum);

    totalSum += maxSum;
}

console.log(totalSum);
