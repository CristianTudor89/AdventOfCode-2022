const path = require('path');
const fs = require('fs');
const { assert } = require('console');

const input = fs.readFileSync(path.join(__dirname, 'day24.txt'), 'utf8').toString().split('\r\n')

class Queue 
{
    constructor() 
    {
      this.elements = {};
      this.head = 0;
      this.tail = 0;
    }

    push(element)
    {
      this.elements[this.tail] = element;
      this.tail++;
    }

    pop()
    {
      const item = this.elements[this.head];
      delete this.elements[this.head];
      this.head++;
      return item;
    }

    size()
    {
      return this.tail - this.head;
    }

    isEmpty()
    {
      return this.size() == 0;
    }
}

let rows = input.length;
let cols = input[0].length;

function GetNextPos(blizzard, i, j)
{
    if (blizzard == '>')
    {
        if (j == cols - 2)
            return [i, 1];
        else
            return [i, j + 1];
    }
    else if (blizzard == '<')
    {
        if (j == 1)
            return [i, cols - 2];
        else
            return [i, j - 1];
    }
    else if (blizzard == '^')
    {
        if (i == 1)
            return [rows - 2, j];
        else
            return [i - 1, j];
    }
    else if (blizzard == 'v')
    {
        if (i == rows - 2)
            return [1, j];
        else
            return [i + 1, j];
    }

    return [i, j];
}

let currentMap = new Array(rows);

for (let i = 0; i < rows; i++)
{
    currentMap[i] = new Array(cols);

    for (let j = 0; j < cols; j++)
        currentMap[i][j] = input[i][j];
}

let maps = [];
maps.push(currentMap);

let emptyMap = structuredClone(currentMap);

for (let i = 1; i < rows - 1; i++)
{
    for (let j = 1; j < cols - 1; j++)
        emptyMap[i][j] = '.';
}

let mapCount = (rows - 2) * (cols - 2);

for (let k = 0; k < mapCount - 1; k++)
{
    let newMap = structuredClone(emptyMap);

    for (let i = 1; i < rows - 1; i++)
    {
        for (let j = 1; j < cols - 1; j++)
        {
            if (currentMap[i][j] == '.')
                continue;

            let blizzards = [];

            if (Array.isArray(currentMap[i][j]))
                blizzards = currentMap[i][j];
            else
                blizzards.push(currentMap[i][j]);

            for (let blizzard of blizzards)
            {
                let [x, y] = GetNextPos(blizzard, i, j);

                if (newMap[x][y] == '.')
                    newMap[x][y] = blizzard;
                else
                {

                    if (!Array.isArray(newMap[x][y]))
                        newMap[x][y] = [newMap[x][y]];

                    newMap[x][y].push(blizzard);
                }
            }
        }
    }

    maps.push(newMap);

    currentMap = structuredClone(newMap);
}

function GetCandidatePositions(map, pos, startPos)
{
    let positions = [];
    let offsets = [];

    if (startPos[0] == 0)
        offsets = [[0, 1], [1, 0], [-1, 0], [0, -1], [0, 0]];
    else
        offsets = [[0, -1], [-1, 0], [1, 0], [0, 1], [0, 0]];

    for (let offset of offsets)
    {
        let newPos = [pos[0] + offset[0], pos[1] + offset[1]];

        if (newPos[0] == -1 || newPos[0] == rows)
            continue;

        if (newPos[0] == startPos[0] && newPos[1] == startPos[1])
            continue;

        if (map[newPos[0]][newPos[1]] == '.')
            positions.push(newPos);
    }

    return positions;
}

let minutesCount = 0;

function Traverse(startPos, endPos)
{
    let visited = new Map();

    let startState = [startPos, minutesCount];
    
    let queue = new Queue();
    queue.push(startState);
    
    while (!queue.isEmpty())
    {
        let [pos, minutes] = queue.pop();
    
        if (pos[0] == endPos[0] && pos[1] == endPos[1])
        {
            minutesCount = minutes;
            console.log(minutesCount);
            break;
        }
    
        let key = pos[0] + '|' + pos[1] + '|' + minutes;
    
        if (visited.has(key))
            continue;
    
        visited.set(key, true);
    
        minutes++;
        let mapIndex = minutes % maps.length;
    
        let candidatePositions = GetCandidatePositions(maps[mapIndex], pos, startPos);

        if (candidatePositions.length == 0 && pos[0] == startPos[0] && pos[1] == startPos[1])
            candidatePositions.push(pos);
    
        for (let candidatePos of candidatePositions)
            queue.push([candidatePos, minutes]);
    }
}

let startPos = [0, 1];
let endPos = [rows - 1, cols - 2];

Traverse(startPos, endPos);
Traverse(endPos, startPos);
Traverse(startPos, endPos);
