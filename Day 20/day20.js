const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'day20.txt'), 'utf8').toString().trim().split('\r\n').map(Number)

class Node
{
    constructor(index, value, next, prev)
    {
        this.index = index;
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

function UpdateNode(node)
{
    if (node.value > 0)
    {
        for (let i = 0; i < node.value; i++)
        {
            let index = node.index;
            let value = node.value;
            node.index = node.next.index;
            node.value = node.next.value;
            node.next.index = index;
            node.next.value = value;
            node = node.next;
        }
    }
    else if (node.value < 0)
    {
        for (let i = 0; i < Math.abs(node.value); i++)
        {
            let index = node.index;
            let value = node.value;
            node.index = node.prev.index;
            node.value = node.prev.value;
            node.prev.index = index;
            node.prev.value = value;
            node = node.prev;
        }
    }
}

let firstNode = new Node(0, input[0], null, null);
let currentNode = firstNode;

for (let i = 1; i < input.length; i++)
{
    let newNode = new Node(i, input[i], null, currentNode);
    currentNode.next = newNode;
    currentNode = newNode;
}

currentNode.next = firstNode;
firstNode.prev = currentNode;
currentNode = firstNode;

for (let i = 0; i < input.length; i++)
{
    let node = currentNode;

    while (node.index != i)
        node = node.next;

    UpdateNode(node);
}

let sum = 0;

while (currentNode.value != 0)
    currentNode = currentNode.next;

for (let groove = 0; groove < 3; groove++)
{
    for (let i = 0; i < 1000; i++)
        currentNode = currentNode.next;
    
    sum += currentNode.value;
}

console.log(sum);

// Part 2
for (let i = 0; i < input.length; i++)
{
    input[i] = input[i] * 811589153;
}

class NumberIndexPair
{
    constructor(number, index)
    {
        this.number = number;
        this.index = index;
    }
}

let pairs = [];

for (let i = 0; i < input.length; i++)
{
    let pair = new NumberIndexPair(input[i], i);

    pairs.push(pair);
}

function GetIndex(index)
{
    for (let i = 0; i < pairs.length; i++)
    {
        if (pairs[i].index == index)
            return i;
    }

    return -1;
}

for (let mixCount = 0; mixCount < 10; mixCount++) 
{
    for (let i = 0; i < input.length; i++) 
    {
        let index = GetIndex(i);
        pairs.splice(index, 1);
        pairs.splice((index + input[i]) % pairs.length, 0, new NumberIndexPair(input[i], i));
    }
}

let zeroIndex = 0;

for (let i = 0; i < pairs.length; i++)
{
    if (pairs[i].number == 0)
    {
        zeroIndex = i;
        break;
    }
}

sum = 0;

for (let groove = 1; groove <= 3; groove++)
{
    sum += pairs[(zeroIndex + 1000 * groove) % pairs.length].number;
}

console.log(sum);
