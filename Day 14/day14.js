const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'day14.txt'), 'utf8').toString().trim().split('\r\n')

let rows = 1000, cols = 1000;

let matrix = new Array(rows);

for (let i = 0; i < rows; i++)
    matrix[i] = new Array(cols);

for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++)
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
    for (let i = rows - 1; i >= 0; i--)
    {
        for (let j = 0; j < cols; j++)
        {
            if (matrix[i][j] == '#')
                return i;
        }
    }

    return 0;
}

function UpdateSandPos(pos)
{
    if (matrix[pos[0] + 1][pos[1]] == '.')
    {
        pos[0]++;
    }
    else if (matrix[pos[0] + 1][pos[1] - 1] == '.')
    {
        pos[0]++;
        pos[1]--;
    }
    else if (matrix[pos[0] + 1][pos[1] + 1] == '.')
    {
        pos[0]++;
        pos[1]++;
    }
}

// Part 1
let matrixClone = structuredClone(matrix);
let bottomRow = GetBottomRow();

let finished = false;

while (!finished)
{
    let sandPos = structuredClone(startPos);

    while (true)
    {
        let posX = sandPos[0];

        UpdateSandPos(sandPos);

        if (posX == sandPos[0])
        {
            units++;
            matrix[sandPos[0]][sandPos[1]] = 'o';
            break;
        }

        if (sandPos[0] == bottomRow)
        {
            finished = true;
            break;
        }
    }
}

console.log(units);

// Part 2
matrix = structuredClone(matrixClone);
bottomRow = GetBottomRow() + 2;
units = 0;

finished = false;

while (!finished)
{
    let sandPos = structuredClone(startPos);

    while (true)
    {
        let posX = sandPos[0];

        UpdateSandPos(sandPos);

        if (posX == sandPos[0])
        {
            if (sandPos[0] == startPos[0])
            {
                units++;
                finished = true;
                break;
            }

            units++;
            matrix[sandPos[0]][sandPos[1]] = 'o';
            break;
        }

        if (sandPos[0] == bottomRow - 1)
        {
            units++;
            matrix[sandPos[0]][sandPos[1]] = 'o';
            break;
        }
    }
}

console.log(units);
