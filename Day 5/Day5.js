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
stacks.push(Array.from('WLS'))
stacks.push(Array.from('QNTJ'))
stacks.push(Array.from('JFHCS'))
stacks.push(Array.from('BGNWMRT'))
stacks.push(Array.from('BQHDSLRT'))
stacks.push(Array.from('LRHFVBJM'))
stacks.push(Array.from('MJNRWD'))
stacks.push(Array.from('JDNHFTZB'))
stacks.push(Array.from('TFBNQLH'))

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

    vals = []
    for (let i = 1; i < stacks.length; i++)
        vals.push(stacks[i][0]);

    console.log(vals.join(''));
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

    vals = []
    for (let i = 1; i < stacks.length; i++)
        vals.push(stacks[i][0]);

    console.log(vals.join(''));
}

// Part1();
Part2();