const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'day2.txt'), 'utf8')
                .toString()
                .trim()
	            .split('\n')
	            .map((line) => {
                let [a, b] = line.split(' ');
                x = a.charAt(0);
                y = b.charAt(0);
                    return {
                        x,
                        y}
		        });

let score = 0;

// x - rock
// y - paper
// z - scissors

for (let i = 0; i < input.length; i++)
{
    let a = input[i].x;
    let b = input[i].y;

    // a - rock
    if (a == 'A')
    {
        if (b == 'X')
            score += 1 + 3;
        else if (b == 'Y')
            score += 2 + 6;
        else if (b == 'Z')
            score += 3 + 0;
    }
    // a - paper
    else if (a == 'B')
    {
        if (b == 'X')
            score += 1 + 0;
        else if (b == 'Y')
            score += 2 + 3;
        else if (b == 'Z')
            score += 3 + 6;
    }
    // a - scissors
    else if (a == 'C')
    {
        if (b == 'X')
            score += 1 + 6;
        else if (b == 'Y')
            score += 2 + 0;
        else if (b == 'Z')
            score += 3 + 3;
    }
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

    // a - rock
    if (a == 'A')
    {
        if (b == 'X')
            score += 1 + 3;
        else if (b == 'Y')
            score += 2 + 6;
        else if (b == 'Z')
            score += 3 + 0;
    }
    // a - paper
    else if (a == 'B')
    {
        if (b == 'X')
            score += 1 + 0;
        else if (b == 'Y')
            score += 2 + 3;
        else if (b == 'Z')
            score += 3 + 6;
    }
    // a - scissors
    else if (a == 'C')
    {
        if (b == 'X')
            score += 1 + 6;
        else if (b == 'Y')
            score += 2 + 0;
        else if (b == 'Z')
            score += 3 + 3;
    }
}

console.log(score);
