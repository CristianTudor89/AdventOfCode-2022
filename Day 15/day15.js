const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'day15.txt'), 'utf8').toString().trim().split('\r\n')

class Point
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}

let sensors = [];
let beacons = [];

function ManhattanDistance(point1, point2)
{
    return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
}

function BeaconExists(candidateBeacon)
{
    for (let beacon of beacons)
    {
        if (beacon.x == candidateBeacon.x && beacon.y == candidateBeacon.y)
            return true;
    }

    return false;
}

function CanDistressBeaconExist(candidateBeacon)
{
    for (let i = 0; i < sensors.length; i++)
    {
        if (ManhattanDistance(sensors[i], candidateBeacon) <= ManhattanDistance(sensors[i], beacons[i]))
            return false;
    }

    return true;
}

for (let line of input)
{
    let numbers = line.match(/-?\d+/g).map(Number);

    let sensor = new Point(numbers[1], numbers[0]);
    let beacon = new Point(numbers[3], numbers[2]);

    sensors.push(sensor);
    beacons.push(beacon);
}

// Part 1
let row = 2000000;
let bound = 10000000;
let count = 0;

for (let col = -bound; col <= bound; col++)
{
    let candidateBeacon = new Point(row, col);

    if (BeaconExists(candidateBeacon))
        continue;
    
    if (!CanDistressBeaconExist(candidateBeacon))
        count++;
}

console.log(count);

// Part 2
bound = 4000000;

for (let i = 0; i <= bound; i++)
{
    let j = 0;

    while (j <= bound)
    {
        let candidateBeacon = new Point(i, j);

        if (BeaconExists(candidateBeacon))
        {
            j++;
            continue;
        }

        for (let k = 0; k < sensors.length; k++)
        {
            if (ManhattanDistance(sensors[k], candidateBeacon) <= ManhattanDistance(sensors[k], beacons[k]))
            {
                j += ManhattanDistance(sensors[k], beacons[k]) - ManhattanDistance(sensors[k], candidateBeacon) + 1;
                break;
            }
        }

        if (candidateBeacon.y == j)
        {
            console.log(j * 4000000 + i);
            i = bound + 1;
            break;
        }
    }
}
