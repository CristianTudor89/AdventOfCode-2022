const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'day14.txt'), 'utf8').toString().trim().split('\r\n')

matrix = [];
matrix = new Array(1000);

for (let i = 0; i < 1000; i++)
    matrix[i] = new Array(1000);

for (let i = 0; i < 1000; i++)
    for (let j = 0; j < 1000; j++)
        matrix[i][j] = '.';

for (let line of input)
{
    let tokens = line.split(' -> ');

    for (let i = 0; i < tokens.length - 1; i++)
    {  
        let [y1, x1] = tokens[i].split(',').map(Number);
        let [y2, x2] = tokens[i + 1].split(',').map(Number);

        if (y1 == y2)
        {
            for (let j = Math.min(x1, x2); j <= Math.max(x1, x2); j++)
            {
                matrix[j][y1] = '#';
            }
        }
        else if (x1 == x2)
        {
            for (let j = Math.min(y1, y2); j <= Math.max(y1, y2); j++)
            {
                matrix[x1][j] = '#';
            }
        }
    }
}

let startPos = [0, 500];
let units = 0;

function GetBottomRow()
{
    for (let i = 999; i >= 0; i--)
    {
        for (let j = 0; j < 1000; j++)
        {
            if (matrix[i][j] == '#')
                return i;
        }
    }

    return 0;
}

// Part 1
// let bottomRow = GetBottomRow();

// Part 2
let bottomRow = GetBottomRow() + 2;

let x = true;

while (x)
{
    let sandPos = structuredClone(startPos);

    while (true)
    {
        let sandPosClone = structuredClone(sandPos);

        if (matrix[sandPos[0] + 1][sandPos[1]] == '.')
        {
            sandPos[0]++;
        }
        else if (matrix[sandPos[0] + 1][sandPos[1] - 1] == '.')
        {
            sandPos[0]++;
            sandPos[1]--;
        }
        else if (matrix[sandPos[0] + 1][sandPos[1] + 1] == '.')
        {
            sandPos[0]++;
            sandPos[1]++;
        }
        else
        {
            // Part 2
            if (sandPos[0] == startPos[0])
            {
                units++;
                x = false;
                break;
            }

            // Common
            units++;
            matrix[sandPos[0]][sandPos[1]] = 'o';
            break;
        }

        // Part 2
        if (sandPos[0] == bottomRow - 1)
        {
            units++;
            matrix[sandPos[0]][sandPos[1]] = 'o';
            break;
        }

        // Part 1
        // if (sandPos[0] == bottomRow)
        // {
        //     x = false;
        //     break;
        // }
    }
}

console.log(units);
