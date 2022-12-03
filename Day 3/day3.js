const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'day3.txt'), 'utf8')
                .toString()
                .trim()
	            .split('\r\n')

function GetMatch(s1, s2)
{
    // if s2 is a Set, convert it to an Array
    let arrS2 = Array.from(s2);
    let chars = new Set();

    for (let i of s1)
    {
        if (arrS2.includes(i))
            chars.add(i);
    }

    return chars;
}

function GetScore(match)
{
    let score = 0;

    for (let char of match)
    {
        let code = char.charCodeAt(0);
        if (char == char.toUpperCase())
            code -= 38;
        else
            code -= 96;
        
        score += code;
    }

    return score;
}

// Part 1
let score = 0;

for (line of input)
{
    let size = line.length;
    let x = line.substring(0, size / 2);
    let y = line.substring(size / 2);
    
    let match = GetMatch(x, y);
    
    score += GetScore(match);
}

console.log(score);

// Part 2
score = 0;

for (let i = 0; i < input.length - 2; i += 3)
{
    let match = GetMatch(input[i], input[i + 1]);
    match = GetMatch(match, input[i + 2]);

    score += GetScore(match);
}

console.log(score);
