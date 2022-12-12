const path = require('path');
const fs = require('fs');

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

const input = fs.readFileSync(path.join(__dirname, 'day12.txt'), 'utf8').toString().trim().split('\r\n')

matrix = [];
startPos = [0, 0];
endPos = [0, 0];
rows = input.length;
cols = input[0].length;

for (let i = 0; i < input.length; i++)
{
    matrix.push(input[i]);

    for (let j = 0; j < input[i].length; j++)
    {
        if (input[i][j] == 'S')
        {
            startPos[0] = i;
            startPos[1] = j;
        }
        else if (input[i][j] == 'E')
        {
            endPos[0] = i;
            endPos[1] = j;
        }
    }
}

function GetNeighbours(x, y)
{
    let neighbours = [];

    if (y > 0)
        neighbours.push([x, y - 1]);

    if (x > 0)
        neighbours.push([x - 1, y]);

    if (y < cols - 1)
        neighbours.push([x, y + 1]);

    if (x < rows - 1)
        neighbours.push([x + 1, y]);

    return neighbours;
}

function BFS()
{
    let queue = new Queue();
    queue.push(startPos);

    let visited = [];
    visited.push(startPos);

    let steps = 0;
    
    while (!queue.isEmpty())
    {
        let queueSize = queue.size();

        for (let i = 0; i < queueSize; i++)
        {
            let currentPos = queue.pop();

            let neighbours = GetNeighbours(currentPos[0], currentPos[1]);

            for (let neighbour of neighbours)
            {
                let candidate = matrix[neighbour[0]][neighbour[1]];
                let candidatePos = [neighbour[0], neighbour[1]];

                if (matrix[currentPos[0]][currentPos[1]] != 'S')
                {
                    if (candidate == 'E')
                        return steps + 1;

                    if (candidate.charCodeAt(0) - matrix[currentPos[0]][currentPos[1]].charCodeAt(0) > 1)
                        continue;
                }

                let includes = false;

                for (let node of visited)
                {
                    if (node[0] == neighbour[0] && node[1] == neighbour[1])
                    {
                        includes = true;
                        break;
                    }
                }
    
                if (includes)
                    continue;
                
                queue.push(candidatePos);
                visited.push(candidatePos);
            }
        }

        steps++;
    }

    return 0;
}

// Part 1
let steps = BFS();

console.log(steps);

stepsArray = [];
stepsArray.push(steps);

// Part 2
for (let i = 0; i < rows; i++)
{
    for (let j = 0; j < cols; j++)
    {
        if (matrix[i][j] == 'a')
        {
            startPos = [i, j];
            
            let steps = BFS();
            if (steps != 0)
                stepsArray.push(steps);
        }
    }
}

console.log(Math.min(...stepsArray));
