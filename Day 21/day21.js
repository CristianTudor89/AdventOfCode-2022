const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'day21.txt'), 'utf8').toString().trim().split('\r\n');

let map = new Map();

for (line of input)
{
    let tokens = line.split(': ');

    map.set(tokens[0], tokens[1]);
}

function GetNumber(monkey, part2)
{
    let value = map.get(monkey);

    if (!Number.isNaN(parseInt(value, 10)))
        return parseInt(value, 10);

    let tokens = value.split(' ');

    if (monkey == 'root' && part2)
        return GetNumber(tokens[0]) - GetNumber(tokens[2]);

    if (tokens[1] == '+')
        return GetNumber(tokens[0]) + GetNumber(tokens[2]);
    else if (tokens[1] == '-')
        return GetNumber(tokens[0]) - GetNumber(tokens[2]);
    else if (tokens[1] == '*')
        return GetNumber(tokens[0]) * GetNumber(tokens[2]);
    else if (tokens[1] == '/')
        return Math.floor(GetNumber(tokens[0]) / GetNumber(tokens[2]));
}

let result = GetNumber('root', false);

console.log(result);

// Part 2
let [x, y] = [0, 99999999999999];

let initialDiff = GetNumber('root', true);

while (Math.abs(x - y) > 1)
{
    let midValue = Math.floor((x + y) / 2);
    map.set('humn', midValue);

    let diff = GetNumber('root', true);

    if (diff == 0)
    {
        console.log(midValue - 1);
        break;
    }

    if (Math.sign(initialDiff) == Math.sign(diff))
    {
        x = midValue + 1;
    }
    else
    {
        y = midValue;
    }
}
