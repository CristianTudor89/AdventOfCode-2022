const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'day9.txt'), 'utf8')
                .toString()
                .trim()
                .split('\r\n')

startPos = [1000, 1000];

//-------------------------------- Part 1 --------------------------------

function Part1()
{
    tailPos = structuredClone(startPos);
    headPos = structuredClone(startPos);

    tailPositions = [startPos];

    for (let line of input)
    {
        [dir, amount] = line.split(' ');

        for (let i = 0; i < amount; i++)
        {
            if (dir == 'R')
            {
                headPos[1]++;
            }
            else if (dir == 'L')
            {
                headPos[1]--;
            }
            else if (dir == 'U')
            {
                headPos[0]--;
            }
            else if (dir == 'D')
            {
                headPos[0]++;
            }

            if (Math.abs(headPos[1] - tailPos[1]) == 2)
            {
                if (headPos[1] == tailPos[1] + 2)
                {
                    tailPos[1]++;
                }
                else if (headPos[1] == tailPos[1] - 2)
                {
                    tailPos[1]--;
                }

                if (Math.abs(tailPos[0] - headPos[0]) == 1)
                    tailPos[0] = headPos[0];
            }
            else if (Math.abs(headPos[0] - tailPos[0]) == 2)
            {
                if (headPos[0] == tailPos[0] + 2)
                {
                    tailPos[0]++;
                }
                else if (headPos[0] == tailPos[0] - 2)
                {
                    tailPos[0]--;
                }

                if (Math.abs(tailPos[1] - headPos[1]) == 1)
                    tailPos[1] = headPos[1];
            }

            const clone = structuredClone(tailPos);

            let found = false;
            for (let pos of tailPositions)
                if (pos[0] == clone[0] && pos[1] == clone[1])
                    found = true;
            
            if (found == false)
                tailPositions.push(clone);
        }
    }

    console.log(tailPositions.length);
}

//-------------------------------- Part 2 --------------------------------

knots = [];
const knotsCount = 10;

function UpdateKnots(currentKnotPos, dir)
{
    let currentKnot = knots[currentKnotPos];
    if (currentKnotPos == knotsCount - 1)
        return;

    let nextKnot = knots[currentKnotPos + 1];

    if (dir != 'none')
    {
        if (dir == 'R')
        {
            currentKnot[1]++;
        }
        else if (dir == 'L')
        {
            currentKnot[1]--;
        }
        else if (dir == 'U')
        {
            currentKnot[0]--;
        }
        else if (dir == 'D')
        {
            currentKnot[0]++;
        }
    }

    let alreadyMoved = false;

    if (Math.abs(currentKnot[1] - nextKnot[1]) == 2)
    {
        if (currentKnot[1] == nextKnot[1] + 2)
        {
            nextKnot[1]++;
        }
        else if (currentKnot[1] == nextKnot[1] - 2)
        {
            nextKnot[1]--;
        }

        if (Math.abs(nextKnot[0] - currentKnot[0]) == 1)
            nextKnot[0] = currentKnot[0];

        alreadyMoved = true;
    }

    if (Math.abs(currentKnot[0] - nextKnot[0]) == 2)
    {
        if (currentKnot[0] == nextKnot[0] + 2)
        {
            nextKnot[0]++;
        }
        else if (currentKnot[0] == nextKnot[0] - 2)
        {
            nextKnot[0]--;
        }

        if (!alreadyMoved)
        {
            if (Math.abs(nextKnot[1] - currentKnot[1]) == 1)
                nextKnot[1] = currentKnot[1];
        }
    }
}

function Part2()
{
    for (let i = 0; i < knotsCount; i++)
        knots[i] = structuredClone(startPos);

    tailPositions = [];

    for (let line of input)
    {
        [dir, amount] = line.split(' ');

        for (let i = 0; i < amount; i++)
        {
            for (let j = 0; j < knots.length; j++)
            {
                let newDir = dir;
                if (j > 0)
                    newDir = 'none';

                UpdateKnots(j, newDir);

                if (j == knotsCount - 1)
                    break;

                if (j == knotsCount - 2)
                {
                    const clone = structuredClone(knots[j + 1]);

                    let found = false;
                    for (let pos of tailPositions)
                        if (pos[0] == clone[0] && pos[1] == clone[1])
                            found = true;
                    
                    if (found == false)
                        tailPositions.push(clone);
                }
            }
        }
    }

    console.log(tailPositions.length);
}

Part1();
Part2();
