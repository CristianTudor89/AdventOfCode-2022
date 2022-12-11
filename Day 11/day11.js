const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'day11.txt'), 'utf8').toString().trim().split('\r\n')

part1 = false

let product = 1;

class Monkey
{
    worryLevels = [];
    inspectionCount = 0;
    operation = '';
    amount = 0;
    divisibleBy = 0;
    throwToIfDiv = 0;
    throwToIfNotDiv = 0;

    InspectItems()
    {
        this.inspectionCount += this.worryLevels.length;

        let decisions = [];

        for (let worryLevel of this.worryLevels)
        {
            let realAmount = this.amount;

            if (isNaN(this.amount))
                realAmount = worryLevel;

            if (this.operation == '+')
                worryLevel += realAmount;
            else
                worryLevel *= realAmount;

            if (part1)
            {
                worryLevel /= 3;
                worryLevel = Math.floor(worryLevel);
            }
            else
                worryLevel %= product;

            if (worryLevel % this.divisibleBy == 0)
            {
                decisions.push([this.throwToIfDiv, worryLevel]);
            }
            else
            {
                decisions.push([this.throwToIfNotDiv, worryLevel]);
            }
        }

        this.worryLevels = [];

        return decisions;
    }
}

let monkeys = [];
let monkey;

for (let line of input)
{
    let tokens = line.trim().split(' ');
    let lastNumber = parseInt(tokens[tokens.length - 1], 10);

    if (line == '')
        continue;

    if (line.includes("Monkey"))
    {
        monkey = new Monkey();
        continue;
    }

    if (line.includes("Starting items"))
    {
        for (let i = 2; i < tokens.length - 1; i++)
        {
            monkey.worryLevels.push(parseInt(tokens[i].slice(0, -1), 10));
        }

        monkey.worryLevels.push(lastNumber);
    }
    else if (line.includes("Operation"))
    {
        monkey.operation = tokens[tokens.length - 2];
        monkey.amount = lastNumber;
    }
    else if (line.includes("divisible"))
    {
        monkey.divisibleBy = lastNumber;
    }
    else if (line.includes("true"))
    {
        monkey.throwToIfDiv = lastNumber;
    }
    else if (line.includes("false"))
    {
        monkey.throwToIfNotDiv = lastNumber;

        monkeys.push(monkey);
    }
}

for (let monkey of monkeys)
{
    product *= monkey.divisibleBy;
}

let rounds = part1 ? 20 : 10000;

for (let round = 0; round < rounds; round++)
{
    for (let i = 0; i < monkeys.length; i++)
    {
        let decisions = monkeys[i].InspectItems();

        for (let decision of decisions)
        {
            let monkeyIndex = decision[0];
            let worryLevel = decision[1];

            monkeys[monkeyIndex].worryLevels.push(worryLevel);
        }
    }
}

let maxInspectionCount1 = 0, maxInspectionCount2 = 0;
let monkeyIndex = 0;

for (let i = 0; i < monkeys.length; i++)
{
    if (monkeys[i].inspectionCount > maxInspectionCount1)
    {
        maxInspectionCount1 = monkeys[i].inspectionCount;
        monkeyIndex = i;
    }
}

for (let i = 0; i < monkeys.length; i++)
{
    if (i != monkeyIndex && monkeys[i].inspectionCount > maxInspectionCount2)
    {
        maxInspectionCount2 = monkeys[i].inspectionCount;
    }
}

console.log(maxInspectionCount1 * maxInspectionCount2);
