const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'day8.txt'), 'utf8')
                .toString()
                .trim()
	            .split('\r\n')

let rows = input.length;
let cols = input[0].length;

function Part1()
{
    let sum = rows * 2 + cols * 2 - 4;
    
    for (let i = 1; i < rows - 1; i++)
    {
        for (let j = 1; j < cols - 1; j++)
        {
            // left
            let visible = true;
            for (let k = 0; k < j; k++)
                if (input[i][k] >= input[i][j])
                    visible = false;
    
            if (visible)
            {
                sum++;
                continue;
            }
            
            // right
            visible = true;
            for (let k = j + 1; k < cols; k++)
                if (input[i][k] >= input[i][j])
                    visible = false;
    
            if (visible)
            {
                sum++;
                continue;
            }
    
            // up
            visible = true;
            for (let k = 0; k < i; k++)
                if (input[k][j] >= input[i][j])
                    visible = false;
    
            if (visible)
            {
                sum++;
                continue;
            }
    
            // down
            visible = true;
            for (let k = i + 1; k < rows; k++)
                if (input[k][j] >= input[i][j])
                    visible = false;
    
            if (visible)
            {
                sum++;
                continue;
            }
        }
    }
    
    console.log(sum);
}

function Part2()
{
    trees = []

    for (let i = 1; i < rows - 1; i++)
    {
        for (let j = 1; j < cols - 1; j++)
        {
            let left = 0, right = 0, up = 0, down = 0;

            // left
            for (let k = j - 1; k >= 0; k--)
            {
                if (input[i][k] < input[i][j])
                    left++;
                else
                {
                    left++;
                    break;
                }
            }

            // right
            for (let k = j + 1; k < cols; k++)
            {
                if (input[i][k] < input[i][j])
                    right++;
                else
                {
                    right++;
                    break;
                }
            }
    
            // up
            for (let k = i - 1; k >= 0; k--)
            {
                if (input[k][j] < input[i][j])
                    up++;
                else
                {
                    up++;
                    break;
                }
            }
    
            // down
            for (let k = i + 1; k < rows; k++)
            {
                if (input[k][j] < input[i][j])
                    down++;
                else
                {
                    down++;
                    break;
                }
            }
            
            trees.push(left * right * up  * down);
        }
    }
    
    console.log(Math.max(...trees));
}

Part1();
Part2();
