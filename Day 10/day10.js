const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'day10.txt'), 'utf8')
                .toString()
                .trim()
	            .split('\r\n')

cycles = [];
regVal = 1;
cycleNumber = 0;
matrix = [];

function UpdateCyclesPart1(i, sum)
{
    cycleNumber++;

    if (cycleNumber == cycles[i])
    {
        sum += cycles[i] * regVal;
        i++;
    }

    return [i, sum];
}

function UpdateCyclesPart2(i, j)
{
    cycleNumber++;

    if (j >= regVal - 1 && j <= regVal + 1)
        matrix[i][j] = '#';
    else
        matrix[i][j] = '.';

    if (cycleNumber == cycles[i])
    {
        i++;
        j = 0;
    }
    else
        j++;

    return [i, j];
}

function Part1()
{
    cycles = [20, 60, 100, 140, 180, 220];
    i = 0;
    sum = 0;

    for (let line of input)
    {
        let count = (line == 'noop') ? 1 : 2;

        for (j = 0; j < count; j++)
        {
            [i, sum] = UpdateCyclesPart1(i, sum);
        }

        if (line != 'noop')
        {
            tokens = line.split(' ');
            regVal += parseInt(tokens[1], 10);
        }
    }

    console.log(sum);
}

function Part2()
{
    cycles = [40, 80, 120, 160, 200, 240];
    regVal = 1;
    cycleNumber = 0;

    for (let i = 0; i < 6; i++)
        matrix[i] = new Array(40);

    let i = 0, j = 0;

    for (let line of input)
    {
        let count = (line == 'noop') ? 1 : 2;

        for (k = 0; k < count; k++)
        {
            [i, j] = UpdateCyclesPart2(i, j);
        }

        if (line != 'noop')
        {
            tokens = line.split(' ');
            regVal += parseInt(tokens[1], 10);
        }
    }

    for (let i = 0; i < 6; i++)
    {
        let str = matrix[i].join('');
        console.log(str);
    }
}

Part1();
Part2();
