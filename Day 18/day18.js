const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'day18.txt'), 'utf8').toString().trim().split('\r\n')

class Point
{
    constructor(x, y, z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

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

points = [];

function IsExisting(pointToTest, allPoints)
{
    for (let point of allPoints)
    {
        if (point.x == pointToTest.x && point.y == pointToTest.y && point.z == pointToTest.z)
            return true;
    }

    return false;
}

function GetNeighbours(point)
{
    let neighbours = [];

    for (let i of [-1, 1])
    {
        if (point.x + i >= 0)
            neighbours.push(new Point(point.x + i, point.y, point.z));

        if (point.y + i >= 0)
            neighbours.push(new Point(point.x, point.y + i, point.z));

        if (point.z + i >= 0)
            neighbours.push(new Point(point.x, point.y, point.z + i));
    }

    return neighbours;
}

for (let line of input)
{
    let [x, y, z] = line.split(',').map(Number);
    let point = new Point(x, y, z);

    points.push(point);
}

// Part 1
let count = points.length * 6;

for (let i = 0; i < points.length - 1; i++)
{
    for (let j = i + 1; j < points.length; j++)
    {
        if (points[i].x == points[j].x && points[i].y == points[j].y && (Math.abs(points[i].z - points[j].z) == 1))
            count -= 2;

        else if (points[i].x == points[j].x && (Math.abs(points[i].y - points[j].y) == 1) && points[i].z == points[j].z)
            count -= 2;
            
        else if ((Math.abs(points[i].x - points[j].x) == 1) && points[i].y == points[j].y && points[i].z == points[j].z)
            count -= 2;
    }
}

console.log(count);

// Part 2
let minX = Number.MAX_VALUE, minY = Number.MAX_VALUE, minZ = Number.MAX_VALUE;
let maxX = 0, maxY = 0, maxZ = 0;

for (let point of points)
{
    maxX = Math.max(point.x, maxX);
    maxY = Math.max(point.y, maxY);
    maxZ = Math.max(point.z, maxZ);

    minX = Math.min(point.x, minX);
    minY = Math.min(point.y, minY);
    minZ = Math.min(point.z, minZ);
}

let startPoint = new Point(minX - 1, minY - 1, minZ - 1);

let queue = new Queue();
queue.push(startPoint);

let visited = new Set();

count = 0;

while (!queue.isEmpty())
{
    let point = queue.pop();

    let found = IsExisting(point, visited);
    if (found)
        continue;

    visited.add(point);

    let neighbours = GetNeighbours(point);

    for (let neighbour of neighbours)
    {
        if (IsExisting(neighbour, points))
            count++;
        else
        {
            if (IsExisting(neighbour, visited))
                continue;

            if (neighbour.x <= maxX + 1 && neighbour.y <= maxY + 1 && neighbour.z <= maxZ + 1)
                queue.push(neighbour);
        }
    }
}

console.log(count);
