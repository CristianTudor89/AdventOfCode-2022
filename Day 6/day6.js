const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'day6.txt'), 'utf8')
                .toString()
                .trim()
	            .split('\r\n')

msg = input[0];

// Part 1
// let chars = 4;

// Part 2
let chars = 14;

for (let i = 0; i < msg.length - chars; i++)
{
    let isUnique = true;

    for (let j = i; j < i + chars - 1; j++)
    {
        if (!isUnique)
            break;

        for (let k = j + 1; k < i + chars; k++)
        {
            if (msg[j] == msg[k])
            {
                isUnique = false;
                break;
            }
        }
    }

    if (isUnique)
    {
        console.log(i + chars);
        break;
    }
}
