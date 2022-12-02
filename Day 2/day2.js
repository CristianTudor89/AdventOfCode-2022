const path = require('path');
const fs = require('fs');
const { getSystemErrorName } = require('util');

const input = fs.readFileSync(path.join(__dirname, 'day2.txt'), 'utf8')
                .toString()
                .trim()
	            .split('\r\n')
	            .map((line) => 
                {
                    let [x, y] = line.split(' ');
                    return { x, y };
		        });

function GetScore(a, b)
{
    // X - rock
    // Y - paper
    // Z - scissors

    // a - rock
    if (a == 'A')
    {
        if (b == 'X')
            return 1 + 3;
        else if (b == 'Y')
            return 2 + 6;
        else if (b == 'Z')
            return 3 + 0;
    }

    // a - paper
    else if (a == 'B')
    {
        if (b == 'X')
            return 1 + 0;
        else if (b == 'Y')
            return 2 + 3;
        else if (b == 'Z')
            return 3 + 6;
    }

    // a - scissors
    else if (a == 'C')
    {
        if (b == 'X')
            return 1 + 6;
        else if (b == 'Y')
            return 2 + 0;
        else if (b == 'Z')
            return 3 + 3;
    }
}

// Part 1
let score = 0;

for (let i = 0; i < input.length; i++)
{
    score += GetScore(input[i].x, input[i].y);
}

console.log(score);

// Part 2
score = 0;

for (let i = 0; i < input.length; i++)
{
    let a = input[i].x;
    let c = input[i].y;
    let b = '0';

    if (c == 'X')
    {
        if (a == 'A')
            b = 'Z';
        else if (a == 'B')
            b = 'X';
        else
            b = 'Y';
    }
    else if (c == 'Y')
    {
        if (a == 'A')
            b = 'X';
        else if (a == 'B')
            b = 'Y';
        else if (a == 'C')
            b = 'Z';
    }
    else
    {
        if (a == 'A')
            b = 'Y';
        else if (a == 'B')
            b = 'Z';
        else
            b = 'X';
    }

    score += GetScore(a, b);
}

console.log(score);
