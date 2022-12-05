const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'day5.txt'), 'utf8')
                .toString()
                .trim()
	            .split('\r\n')
                .map((line) => 
                {
                    let [_1, quantity, _2, from, _3, to] = line.split(' ').map(Number);

                    return {quantity, from, to};
                });

// stacks = []
// stacks.push([])
// stacks.push(['N', 'Z'])
// stacks.push(['D', 'C', 'M'])
// stacks.push(['P'])

stacks = []
stacks.push([])
stacks.push(['W', 'L', 'S'])
stacks.push(['Q', 'N', 'T', 'J'])
stacks.push(['J', 'F', 'H', 'C', 'S'])
stacks.push(['B', 'G', 'N', 'W', 'M', 'R', 'T'])
stacks.push(['B', 'Q', 'H', 'D', 'S', 'L', 'R', 'T'])
stacks.push(['L', 'R', 'H', 'F', 'V', 'B', 'J', 'M'])
stacks.push(['M', 'J', 'N', 'R', 'W', 'D'])
stacks.push(['J', 'D', 'N', 'H', 'F', 'T', 'Z', 'B'])
stacks.push(['T', 'F', 'B', 'N', 'Q', 'L', 'H'])

function Part1()
{
    for (let line of input)
    {
        let from = line.from;
        let to = line.to;
        let quantity = line.quantity;

        for (let i = 0; i < quantity; i++)
        {
            stacks[to].unshift(stacks[from][0]);
            stacks[from].shift();
        }
    }

    for (let i = 1; i < stacks.length; i++)
    console.log(stacks[i][0]);
}

function Part2()
{
    for (let line of input)
    {
        let from = line.from;
        let to = line.to;
        let quantity = line.quantity;

        for (let i = 0; i < quantity; i++)
        {
            stacks[to].splice(i, 0, stacks[from][0]);
            stacks[from].shift();
        }
    }

    for (let i = 1; i < stacks.length; i++)
        console.log(stacks[i][0]);
}

// Part1();
Part2();