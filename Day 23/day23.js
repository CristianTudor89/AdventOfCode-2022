const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'day23.txt'), 'utf8').toString().trim().split('\r\n')

class Point
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    GetAdjacentPositions()
    {
        let positions = [];

        let dirX = [-1, 0, 1];
        let dirY = [-1, 0, 1];

        for (let i = 0; i <= 2; i++)
        {
            for (let j = 0; j <= 2; j++)
            {
                if (i == 1 && j == 1)
                    continue;

                positions.push(new Point(this.x + dirX[i], this.y + dirY[j]));
            }
        }

        return positions;
    }
}

class Elf
{
    // north, south, west, east
    directions = [new Point(-1, 0), new Point(1, 0), new Point(0, -1), new Point(0, 1)];
    currentDirIndex = 0;
    proposedPos = null;

    constructor(pos)
    {
        this.pos = pos;
    }

    GetDir()
    {
        return this.directions[this.currentDirIndex];
    }

    ChangeDir()
    {
        this.currentDirIndex = (this.currentDirIndex + 1) % 4;
    }

    GetProposedPos()
    {
        return this.proposedPos;
    }

    HasAdjacentElf()
    {
        let hasAdjacentElf = false;
        let adjacentPositions = this.pos.GetAdjacentPositions();
    
        for (let elf of elfs)
        {
            if (elf.pos.x == this.pos.x && elf.pos.y == this.pos.y)
                continue;
    
            if (hasAdjacentElf)
                break;

            for (let adjacentPos of adjacentPositions)
            {
                if (adjacentPos.x == elf.pos.x && adjacentPos.y == elf.pos.y)
                {
                    hasAdjacentElf = true;
                    break;
                }
            }
        }
    
        return hasAdjacentElf;
    }

    GetPositions()
    {
        let dir = this.GetDir();

        if (dir.y == 0)
            return [new Point(this.pos.x + dir.x, this.pos.y - 1), new Point(this.pos.x + dir.x, this.pos.y), new Point(this.pos.x + dir.x, this.pos.y + 1)];
        else if (dir.x == 0)
            return [new Point(this.pos.x - 1, this.pos.y + dir.y), new Point(this.pos.x, this.pos.y + dir.y), new Point(this.pos.x + 1, this.pos.y + dir.y)];

        return null;
    }

    Update()
    {
        if (!this.HasAdjacentElf())
        {
            this.proposedPos = new Point(this.pos.x, this.pos.y);
            this.ChangeDir();
            return;
        }

        let initialDirIndex = this.currentDirIndex;
        let foundDir = false;

        while (!foundDir)
        {
            let positions = this.GetPositions();
            let isFreeArea = true;

            for (let position of positions)
            {
                for (let elf of elfs)
                {
                    if (elf.pos.x == position.x && elf.pos.y == position.y)
                    {
                        isFreeArea = false;
                        break;
                    }
                }
            }

            if (isFreeArea)
            {
                let dir = this.GetDir();
                this.proposedPos = new Point(this.pos.x + dir.x, this.pos.y + dir.y);
                foundDir = true;
            }
            else
            {
                this.ChangeDir();

                if (this.currentDirIndex == initialDirIndex)
                {
                    this.proposedPos = new Point(this.pos.x, this.pos.y);
                    break;
                }
            }
        }

        this.currentDirIndex = initialDirIndex;

        this.ChangeDir();
    }
}

let matrix = [];

for (let row of input)
{
    matrix.push(row);
}

let rowCount = matrix.length;
let colCount = matrix[0].length;

let elfs = [];

for (let i = 0; i < rowCount; i++)
{
    for (let j = 0; j < colCount; j++)
    {
        if (matrix[i][j] == '#')
        {
            elfs.push(new Elf(new Point(i, j)));
        }
    }
}

// Part 1
// for (let round = 0; round < 10; round++)
let round = 0;

while (true)
{
    round++;

    let moved = false;

    for (let elf of elfs)
        elf.Update();

    for (let i = 0; i < elfs.length; i++)
    {
        let isGoodPos = true;

        for (let j = 0; j < elfs.length; j++)
        {
            if (i == j)
                continue;

            if (elfs[j].GetProposedPos().x == elfs[i].GetProposedPos().x && elfs[j].GetProposedPos().y == elfs[i].GetProposedPos().y)
            {
                isGoodPos = false;
                break;
            }
        }

        if (isGoodPos)
        {
            moved = true;

            elfs[i].pos.x = elfs[i].GetProposedPos().x;
            elfs[i].pos.y = elfs[i].GetProposedPos().y;
        }
    }

    if (moved == false)
    {
        console.log("First round: " + round);
        break;
    }
}

function GetEmptyTilesCount()
{
    let minX = 1000;
    let minY = 1000;
    let maxX = 0;
    let maxY = 0;

    for (let elf of elfs)
    {
        if (elf.pos.x < minX)
            minX = elf.pos.x;

        if (elf.pos.x > maxX)
            maxX = elf.pos.x;

        if (elf.pos.y < minY)
            minY = elf.pos.y;

        if (elf.pos.y > maxY)
            maxY = elf.pos.y;
    }

    let count = 0;

    for (let i = minX; i <= maxX; i++)
    {
        for (let j = minY; j <= maxY; j++)
        {
            let isEmptyTile = true;

            for (let elf of elfs)
            {
                if (elf.pos.x == i && elf.pos.y == j)
                {
                    isEmptyTile = false;
                    break;
                }
            }

            if (isEmptyTile)
                count++;
        }
    }

    return count;
}

console.log(GetEmptyTilesCount());
