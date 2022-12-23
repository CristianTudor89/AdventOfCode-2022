const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'day16.txt'), 'utf8').toString().trim().split('\r\n')

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

class Node
{
    name = '';
    flowRate = 0;
    children = [];

    constructor(name, flowRate)
    {
        this.name = name;
        this.flowRate = flowRate;
    }
}

let nodes = [];

let part2 = true;
let totalTime = part2 ? 26 : 30;

function GetNode(name)
{
    for (let node of nodes)
    {
        if (node.name == name)
            return node;
    }

    return undefined;
}

function ComputePressure(valvesPath)
{
    let pressure = 0;

    for (let i = 0; i < valvesPath.length - 1; i++)
    {
        if (valvesPath[i] == valvesPath[i + 1])
        {
            let timeLeft = totalTime - (i + 1);

            pressure += GetNode(valvesPath[i]).flowRate * timeLeft;
        }
    }

    return pressure;
}

function IsValveOpened(valveName, valvesPath)
{
    for (let i = 0; i < valvesPath.length - 1; i++)
    {
        if (valvesPath[i] == valveName && valvesPath[i + 1] == valveName)
            return true;
    }

    return false;
}

function CanMoveToValve(valveName, valvesPath, useExclusionList)
{
    if (useExclusionList)
    {
        for (let i = 1; i < valvesPath.length; i++)
        {
            for (let j = 1; j < maxPressureList1.length; j++)
            {
                if (maxPressureList1[j] == valvesPath[i])
                    return false;
            }
        }
    }

    if (valveName == valvesPath[valvesPath.length - 2])
        return false;

    let count = 5;

    if (valvesPath.length >= count + 1)
    {
        for (let i = 0; i < valvesPath.length - count - 1; i++)
        {
            let foundOpenedValves = false;

            for (let j = i; j < i + count; j++)
            {
                if (valvesPath[j] == valvesPath[j + 1])
                    foundOpenedValves = true;
            }

            if (!foundOpenedValves)
                return false;
        }
    }

    return true;
}

for (let line of input)
{
    let tokens = line.split(' ');
    let flowRateToken = tokens[4].split('=');

    let node = new Node(tokens[1], parseInt(flowRateToken[1].slice(0, -1)));

    for (let i = 9; i < tokens.length; i++)
    {
        let valve = tokens[i];
        if (valve.endsWith(','))
            valve = valve.slice(0, -1);

        node.children.push(valve);
    }

    nodes.push(node);
}

let maxPressure = 0;
maxPressureList1 = [];
maxPressureList2 = [];

function Execute(useExclusionList)
{
    let valvesPath = ['AA'];
    let startNode = ['AA', 0, valvesPath];

    let queue = new Queue();
    queue.push(startNode);

    while (!queue.isEmpty())
    {
        let node = queue.pop();

        let valveName = node[0];
        let passedTime = node[1];
        let valvesPath = node[2];

        if (passedTime == totalTime)
        {
            let pressure = ComputePressure(valvesPath);
            if (pressure > maxPressure)
            {
                maxPressure = pressure;

                if (!useExclusionList)
                    maxPressureList1 = structuredClone(valvesPath);
                else
                    maxPressureList2 = structuredClone(valvesPath);
            }

            continue;
        }

        let currentNode = GetNode(valveName);

        console.log(valvesPath.length + ' : ' + valvesPath.join(','));

        if (currentNode.flowRate != 0)
        {
            let isValveOpened = IsValveOpened(valveName, valvesPath);
            if (!isValveOpened)
            {
                let newPath = structuredClone(valvesPath);
                newPath.push(valveName);
                
                // open current valve
                queue.push([valveName, passedTime + 1, newPath]);
            }
        }

        for (let child of currentNode.children)
        {
            let canMoveToValve = CanMoveToValve(child, valvesPath, useExclusionList);

            if (canMoveToValve)
            {
                let newPath = structuredClone(valvesPath);
                newPath.push(child);

                // move to other valve
                queue.push([child, passedTime + 1, newPath]);
            }
        }
    }
}

if (!part2)
{
    Execute(false);

    console.log('Path with pressure ' + maxPressure + ': ' + maxPressureList1.join(','));
}
else
{
    Execute(false);

    let maxPressure1 = maxPressure;
    maxPressure = 0;

    Execute(true);

    console.log('Path with pressure ' + maxPressure1 + ': ' + maxPressureList1.join(','));
    console.log('Path with pressure ' + maxPressure + ': ' + maxPressureList2.join(','));

    console.log(maxPressure1 + maxPressure);
}
