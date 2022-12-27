const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'day17.txt'), 'utf8').toString().trim().split('\r\n')

let matrix = [];
let maxHeight = 0;

class Point
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}

class Rock
{
    constructor(points, height)
    {
        this.points = points;
        this.height = height;
    }

    MoveLeft()
    {
        let canMove = true;

        for (let point of this.points)
        {
            if (point.y == 1 || matrix[point.x][point.y - 1] == '#')
            {
                canMove = false;
                break;
            }
        }

        if (canMove)
        {
            for (let point of this.points)
                point.y--;
        }
    }

    MoveRight()
    {
        let canMove = true;

        for (let point of this.points)
        {
            if (point.y == 7 || matrix[point.x][point.y + 1] == '#')
            {
                canMove = false;
                break;
            }
        }

        if (canMove)
        {
            for (let point of this.points)
                point.y++;
        }
    }

    MoveDown()
    {
        let canMove = true;

        for (let point of this.points)
        {
            if (point.x == maxHeight - 2 || matrix[point.x + 1][point.y] == '#')
            {
                canMove = false;
                break;
            }
        }

        if (canMove)
        {
            for (let point of this.points)
                point.x++;
        }

        return !canMove;
    }

    Clone()
    {
        return new Rock(structuredClone(this.points), this.height);
    }
}

let rock1 = new Rock([new Point(0, 3), new Point(0, 4), new Point(0, 5), new Point(0, 6)], 1);
let rock2 = new Rock([new Point(0, 4), new Point(1, 3), new Point(1, 4), new Point(1, 5), new Point(2, 4)], 3);
let rock3 = new Rock([new Point(0, 5), new Point(1, 5), new Point(2, 3), new Point(2, 4), new Point(2, 5)], 3);
let rock4 = new Rock([new Point(0, 3), new Point(1, 3), new Point(2, 3), new Point(3, 3)], 4);
let rock5 = new Rock([new Point(0, 3), new Point(0, 4), new Point(1, 3), new Point(1, 4)], 2);

let rocks = [rock1, rock2, rock3, rock4, rock5];

let jetPattern = input[0];

for (let rock of rocks)
    maxHeight += rock.height;

let rocksCount = 2022;

maxHeight /= 5;
maxHeight *= rocksCount;
maxHeight = Math.floor(maxHeight);

matrix = new Array(maxHeight);

for (let i = 0; i < maxHeight; i++)
    matrix[i] = new Array(9);

for (let i = 0; i < maxHeight; i++)
{
    for (let j = 0; j < 9; j++)
    {
        if (j == 0 || j == 8)
            matrix[i][j] = '|';
        else
            matrix[i][j] = '.';
    }
}

for (let j = 0; j < 9; j++)
    matrix[maxHeight - 1][j] = '-';

let rockIndex = 0;
let jetPatternIndex = 0;
let count = 0;
let currentXPos = maxHeight - 4 - rocks[rockIndex].height;
let currentRock = rocks[rockIndex].Clone();

for (let point of currentRock.points)
        point.x += currentXPos;

while (count < rocksCount)
{
    if (jetPattern[jetPatternIndex] == '>')
        currentRock.MoveRight();
    else
        currentRock.MoveLeft();

    let landed = currentRock.MoveDown();
    if (landed)
    {
        for (let point of currentRock.points)
            matrix[point.x][point.y] = '#';

        let minX = 0;

        for (let i = maxHeight - 2; i > 0; i--)
        {
            let found = true;
        
            for (let j = 1; j < 8; j++)
            {
                if (matrix[i][j] == '#')
                {
                    found = false;
                    break;
                }
            }

            if (found)
            {
                minX = i + 1;
                break;
            }
        }

        count++;
        if (count == rocksCount)
        {
            console.log(maxHeight - minX - 1);
        }

        rockIndex = (rockIndex + 1) % 5;

        currentRock = rocks[rockIndex].Clone();

        currentXPos = minX - 3 - currentRock.height;

        for (let point of currentRock.points)
            point.x += currentXPos;
    }
    
    jetPatternIndex = (jetPatternIndex + 1) % jetPattern.length;
}

let numberOfRocksPerCycle = 1695;
let heightDiffPerCycle = 2610;
let rocksCountBeforeCycleStarts = 1215;

let numberOfCycles = Math.floor(Math.pow(10, 12) / numberOfRocksPerCycle);

console.log(rocksCountBeforeCycleStarts + numberOfCycles * heightDiffPerCycle);
