const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'day13.txt'), 'utf8').toString().trim().split('\r\n')

function GetValues(value)
{
    if (value[0] != '[')
        return [parseInt(value, 10), 'number'];

    if (value == '[]')
        return [0, 'none'];

    value = value.substr(1);
    value = value.slice(0, -1);

    let values = [];
    let openBrackets = 0;
    let startIndex = 0;
    let numStr = '';

    for (let i = 0; i < value.length; i++)
    {
        if (value[i] == '[')
            openBrackets++;
        else if (value[i] == ']')
            openBrackets--;

        if (openBrackets == 0)
        {
            if (value[i] == ']')
            {
                let val = value.substr(startIndex, i + 1);
                values.push(val);
                startIndex = i + 2;
            }
            else
            {
                if (value[i] != ',')
                {
                    numStr += value[i];
                }
                else
                {
                    if (numStr != '')
                    {
                        values.push(numStr);
                        numStr = '';
                    }
                }

                if (numStr != '' && i == value.length - 1)
                    values.push(numStr);
            }
        }
    }

    return [values, 'list'];
}

function IsLower(valueLeft, valueRight)
{
    let values1 = GetValues(valueLeft);
    let values2 = GetValues(valueRight);

    if (values1[1] == 'none' && values2[1] != 'none')
        return 'less';

    if (values1[1] == 'none' && values2[1] == 'none')
        return 'equal';

    if (values1[1] != 'none' && values2[1] == 'none')
        return 'greater';

    if (values1[1] == 'number' && values2[1] == 'number')
    {
        if (values1[0] < values2[0])
            return 'less';
        else if (values1[0] == values2[0])
            return 'equal';
        else
            return 'greater';
    }

    if (values1[1] == 'list' && values2[1] == 'number')
    {
        newValues2 = [[values2[0]], 'list'];

        return CompareLists(values1, newValues2);
    }

    if (values1[1] == 'number' && values2[1] == 'list')
    {
        newValues1 = [[values1[0]], 'list'];

        return CompareLists(newValues1, values2);
    }

    return CompareLists(values1, values2);
}

function CompareLists(list1, list2)
{
    let minLength = list1[0].length;
    if (list2[0].length < minLength)
        minLength = list2[0].length;

    for (let i = 0; i < minLength; i++)
    {
        if (IsLower(list1[0][i], list2[0][i]) == 'less')
            return 'less';

        if (IsLower(list1[0][i], list2[0][i]) == 'greater')
            return 'greater';
    }

    if (list1[0].length < list2[0].length)
        return 'less';
    
    if (list1[0].length > list2[0].length)
        return 'greater';
    
    return 'equal';
}

let indices = [];
let pairIndex = 1;

// Part 1
for (let i = 0; i < input.length; i += 3)
{
    let valueLeft = input[i];
    let valueRight = input[i + 1];

    if (IsLower(valueLeft, valueRight) == 'less')
        indices.push(pairIndex);

    pairIndex++;
}

let sum = 0;
for (let index of indices)
    sum += index;

console.log(sum);

// Part 2

newInput = [];
newInput.push('[[2]]');
newInput.push('[[6]]');

for (let i = 0; i < input.length; i++)
{
    if (input[i] != '')
        newInput.push(input[i]);
}

for (let i = 0; i < newInput.length - 1; i++)
{
    for (let j = i + 1; j < newInput.length; j++)
    {
        if (IsLower(newInput[j], newInput[i]) == 'less')
        {
            let temp = newInput[i];
            newInput[i] = newInput[j];
            newInput[j] = temp;
        }
    }
}

let index1 = 0, index2 = 0;

for (let i = 0; i < newInput.length; i++)
{
    if (newInput[i] == '[[2]]')
        index1 = i;
    else if (newInput[i] == '[[6]]')
        index2 = i;
}

console.log((index1 + 1) * (index2 + 1));
