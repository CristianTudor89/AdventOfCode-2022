const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'day4.txt'), 'utf8')
                .toString()
                .trim()
	            .split('\r\n')
                .map((line) => 
                {
                    let [pair1, pair2] = line.split(',');
                    let[x1, y1] = pair1.split('-').map(Number);
                    let[x2, y2] = pair2.split('-').map(Number);

                    return {x1, y1, x2, y2};
                });

function FullyOverlaps(x1, y1, x2, y2)
{
    return (x2 >= x1 && y2 <= y1) || (x1 >= x2 && y1 <= y2);
}

function PartiallyOverlaps(x1, y1, x2, y2)
{
    return !(y1 < x2 || y2 < x1);
}

let fullyOverlaps = 0, partiallyOverlaps = 0;

for (let i = 0; i < input.length; i++)
{
    let x1 = input[i].x1;
    let y1 = input[i].y1;
    let x2 = input[i].x2;
    let y2 = input[i].y2;

    if (FullyOverlaps(x1, y1, x2, y2))
        fullyOverlaps++;

    if (PartiallyOverlaps(x1, y1, x2, y2))
        partiallyOverlaps++;
}

console.log(fullyOverlaps);
console.log(partiallyOverlaps);
