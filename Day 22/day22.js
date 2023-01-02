const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'day22.txt'), 'utf8').toString().split('\r\n')

class Point
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}

let rows = input.length - 2;
let cols = 0;

for (let i = 0; i < rows; i++)
{
    if (input[i].length > cols)
        cols = input[i].length;
}

let matrix = [];
matrix = new Array(rows);

for (let i = 0; i < rows; i++)
{
    matrix[i] = new Array(cols);

    for (let j = 0; j < cols; j++)
        matrix[i][j] = ' ';
}

for (let i = 0; i < rows; i++)
{
    for (let j = 0; j < input[i].length; j++)
        matrix[i][j] = input[i][j];
}

let pathStr = input[input.length - 1];

let monkeyPath = [];
let turn = 'R';
let amount = '';

for (let i = 0; i < pathStr.length; i++)
{
    if (pathStr[i] == 'L' || pathStr[i] == 'R')
    {
        monkeyPath.push([turn, Number.parseInt(amount, 10)]);

        turn = pathStr[i];
        amount = '';
    }
    else
    {
        amount += pathStr[i];

        if (i + 1 == pathStr.length)
            monkeyPath.push([turn, Number.parseInt(amount, 10)]);
    }
}

let startPos = new Point(0, 0);

for (let j = 0; j < cols; j++)
{
    if (matrix[0][j] == '.')
    {
        startPos.y = j;
        break;
    }
}

function Turn(dir, currentDirIndex)
{
    if (dir == 'R')
    {
        return (currentDirIndex + 1) % 4;
    }
    else if (dir == 'L')
    {
        return (currentDirIndex + 3) % 4;
    }

    return 0;
}

function GetDirIndex(dir)
{
    if (dir.x == 0 && dir.y == 1)
        return 0;
    else if (dir.x == 1 && dir.y == 0)
        return 1;
    else if (dir.x == 0 && dir.y == -1)
        return 2;
    else if (dir.x == -1 && dir.y == 0)
        return 3;
    
    return -1;
}

let rightDir = new Point(0, 1);
let downDir = new Point(1, 0);
let leftDir = new Point(0, -1);
let upDir = new Point(-1, 0);

let dirs = [rightDir, downDir, leftDir, upDir];

function MovePart1(pos, dir)
{
    let newPos = structuredClone(pos);

    newPos.x += dir.x;
    newPos.y += dir.y;

    let wrapOnX = false;
    let wrapOnY = false;

    if (newPos.x == rows || (newPos.x == pos.x + 1 && matrix[newPos.x][newPos.y] == ' '))
    {
        newPos.x = 0;
        wrapOnX = true;
    }
    else if (newPos.x == -1 || (newPos.x == pos.x - 1 && matrix[newPos.x][newPos.y] == ' '))
    {
        newPos.x = rows - 1;
        wrapOnX = true;
    }

    if (newPos.y == cols || (newPos.y == pos.y + 1 && matrix[newPos.x][newPos.y] == ' '))
    {
        newPos.y = 0;
        wrapOnY = true;
    }
    else if (newPos.y == -1 || (newPos.y == pos.y - 1 && matrix[newPos.x][newPos.y] == ' '))
    {
        newPos.y = cols - 1;
        wrapOnY = true;
    }

    if (wrapOnX)
    {
        if (newPos.x == 0)
        {
            while (matrix[newPos.x][newPos.y] == ' ')
                newPos.x++;
        }
        else
        {
            while (matrix[newPos.x][newPos.y] == ' ')
                newPos.x--;
        }
    }
    else if (wrapOnY)
    {
        if (newPos.y == 0)
        {
            while (matrix[newPos.x][newPos.y] == ' ')
                newPos.y++;
        }
        else
        {
            while (matrix[newPos.x][newPos.y] == ' ')
                newPos.y--;
        }
    }
    
    if (matrix[newPos.x][newPos.y] == '#')
        return 'hit wall';

    pos.x = newPos.x;
    pos.y = newPos.y;

    return 0;
}

function MovePart2(pos, dir, region)
{
    //    AB
    //    C
    //   DE
    //   F
    // Region A - (0, 50) -> (49, 99)
    // Region B - (0, 100) -> (49, 149)
    // Region C - (50, 50) -> (99, 99)
    // Region D - (100, 0) -> (149, 49)
    // Region E - (100, 50) -> (149, 99)
    // Region F - (150, 0) -> (199, 49)

    let newPos = structuredClone(pos);

    newPos.x += dir.x;
    newPos.y += dir.y;

    if (region == 'A')
    {
        if (newPos.x == -1) // UP
        {
            newPos.x = newPos.y + 100;
            newPos.y = 0;
            dir = rightDir;
            region = 'F';
        }
        else if (newPos.x == 50) // DOWN
        {
            dir = downDir;
            region = 'C';
        }
        else if (newPos.y == 49) // LEFT
        {
            newPos.x = 149 - newPos.x;
            newPos.y = 0;
            dir = rightDir;
            region = 'D';
        }
        else if (newPos.y == 100) // RIGHT
        {
            dir = rightDir;
            region = 'B';
        }
    }
    else if (region == 'B')
    {
        if (newPos.x == -1) // UP
        {
            newPos.x = 199;
            newPos.y = newPos.y - 100;
            dir = upDir;
            region = 'F';
        }
        else if (newPos.x == 50) // DOWN
        {
            newPos.x = newPos.y - 50;
            newPos.y = 99;
            dir = leftDir;
            region = 'C';
        }
        else if (newPos.y == 99) // LEFT
        {
            dir = leftDir;
            region = 'A';
        }
        else if (newPos.y == 150) // RIGHT
        {
            newPos.x = 149 - newPos.x;
            newPos.y -= 50;
            dir = leftDir;
            region = 'E';
        }
    }
    else if (region == 'C')
    {
        if (newPos.x == 49) // UP
        {
            dir = upDir;
            region = 'A';
        }
        else if (newPos.x == 100) // DOWN
        {
            dir = downDir;
            region = 'E';
        }
        else if (newPos.y == 49) // LEFT
        {
            newPos.y = newPos.x - 50;
            newPos.x = 100;
            dir = downDir;
            region = 'D';
        }
        else if (newPos.y == 100) // RIGHT
        {
            newPos.y = newPos.x + 50;
            newPos.x = 49;
            dir = upDir;
            region = 'B';
        }
    }
    else if (region == 'D')
    {
        if (newPos.x == 99) // UP
        {
            newPos.x = newPos.y + 50;
            newPos.y = 50;
            dir = rightDir;
            region = 'C';
        }
        else if (newPos.x == 150) // DOWN
        {
            dir = downDir;
            region = 'F';
        }
        else if (newPos.y == -1) // LEFT
        {
            newPos.x = 149 - newPos.x;
            newPos.y = 50;
            dir = rightDir;
            region = 'A';
        }
        else if (newPos.y == 50) // RIGHT
        {
            dir = rightDir;
            region = 'E';
        }
    }
    else if (region == 'E')
    {
        if (newPos.x == 99) // UP
        {
            dir = upDir;
            region = 'C';
        }
        else if (newPos.x == 150) // DOWN
        {
            newPos.x = newPos.y + 100;
            newPos.y = 49;
            dir = leftDir;
            region = 'F';
        }
        else if (newPos.y == 49) // LEFT
        {
            dir = leftDir;
            region = 'D';
        }
        else if (newPos.y == 100) // RIGHT
        {
            newPos.x = 149 - newPos.x;
            newPos.y = 149;
            dir = leftDir;
            region = 'B';
        }
    }
    else if (region == 'F')
    {
        if (newPos.x == 149) // UP
        {
            dir = upDir;
            region = 'D';
        }
        else if (newPos.x == 200) // DOWN
        {
            newPos.x = 0;
            newPos.y = newPos.y + 100;
            dir = downDir;
            region = 'B';
        }
        else if (newPos.y == -1) // LEFT
        {
            newPos.y = newPos.x - 100;
            newPos.x = 0;
            dir = downDir;
            region = 'A';
        }
        else if (newPos.y == 50) // RIGHT
        {
            newPos.y = newPos.x - 100;
            newPos.x = 149;
            dir = upDir;
            region = 'E';
        }
    }

    if (matrix[newPos.x][newPos.y] == '#')
        return ['hit wall', dir, region];

    pos.x = newPos.x;
    pos.y = newPos.y;

    return [0, dir, region];
}

function Part1()
{
    let currentPos = structuredClone(startPos);
    let currentDirIndex = 3;

    for (let movement of monkeyPath)
    {
        let dir = movement[0];
        let amount = movement[1];
    
        currentDirIndex = Turn(dir, currentDirIndex);
    
        for (let i = 0; i < amount; i++)
        {
            let result = MovePart1(currentPos, dirs[currentDirIndex]);
            if (result == 'hit wall')
                break;
        }
    }

    console.log(1000 * (currentPos.x + 1) + 4 * (currentPos.y + 1) + currentDirIndex);
}

function Part2()
{
    let currentPos = structuredClone(startPos);

    let currentDirIndex = 3;
    let currentRegion = 'A';
    
    for (let movement of monkeyPath)
    {
        let dir = movement[0];
        let amount = movement[1];
    
        currentDirIndex = Turn(dir, currentDirIndex);
    
        let currentDir = dirs[currentDirIndex];
    
        for (let i = 0; i < amount; i++)
        {
            let [result, newDir, newRegion] = MovePart2(currentPos, currentDir, currentRegion);

            currentDir = newDir;
            currentRegion = newRegion;

            if (result == 'hit wall')
                break;
        }
    
        currentDirIndex = GetDirIndex(currentDir);
    }
    
    console.log(1000 * (currentPos.x + 1) + 4 * (currentPos.y + 1) + currentDirIndex);
}

// Part1();
Part2();
