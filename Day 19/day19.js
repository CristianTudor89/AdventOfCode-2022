const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'day19.txt'), 'utf8').toString().trim().split('\r\n')

function IsExistingState(state, visitedStates)
{
    for (let visitedState of visitedStates)
    {
        let found = true;

        for (let i = 0; i < state.length; i++)
        {
            if (state[i] != visitedState[i])
            {
                found = false;
                break;
            }
        }

        if (found)
            return true;
    }

    return false;
}

let blueprints = [];

for (line of input)
{
    // index
    // ore robot - ore cost
    // clay robot - ore cost
    // obsidian robot - ore cost, clay cost
    // geode robot - ore cost, obsidian cost
    let numbers = line.match(/\d+/g).map(Number);

    blueprints.push(numbers);
}

let part2 = true;

let sum = 0;
let product = 1;

for (let blueprint of blueprints)
{
    let blueprintIndex = blueprint[0];
    let oreRobotCost = blueprint[1];
    let clayRobotCost = blueprint[2];
    let obsRobotOreCost = blueprint[3];
    let obsRobotClayCost = blueprint[4];
    let geodeRobotOreCost = blueprint[5];
    let geodeRobotObsCost = blueprint[6];

    let maxGeodes = 0;

    // [ore, clay, obsidian, geodes, ore robots, clay robots, obsidian robots, geode robots]
    let initialState = [0, 0, 0, 0, 1, 0, 0, 0, 0];

    let states = [];
    states.push(initialState);

    let totalTime = part2 ? 32 : 24;

    for (let time = 0; time < totalTime; time++)
    {
        let newStates = [];

        for (let state of states)
        {
            if (maxGeodes >= 1 && maxGeodes - state[3] >= 1)
                continue;

            let newState = structuredClone(state);

            newState[0] += newState[4];
            newState[1] += newState[5];
            newState[2] += newState[6];
            newState[3] += newState[7];

            if (newState[3] > maxGeodes)
                maxGeodes = newState[3];

            if (!IsExistingState(newState, newStates))
                newStates.push(newState);

            if (newState[0] >= oreRobotCost && newState[4] < Math.max(clayRobotCost, obsRobotOreCost, geodeRobotOreCost))
            {
                let clonedState = structuredClone(newState);
                clonedState[0] -= oreRobotCost;
                clonedState[4]++;

                if (!IsExistingState(clonedState, newStates))
                    newStates.push(clonedState);
            }
    
            if (newState[0] >= clayRobotCost && newState[5] < obsRobotClayCost)
            {
                let clonedState = structuredClone(newState);
                clonedState[0] -= clayRobotCost;
                clonedState[5]++;
    
                if (!IsExistingState(clonedState, newStates))
                    newStates.push(clonedState);
            }
    
            if (newState[0] >= obsRobotOreCost && newState[1] >= obsRobotClayCost && newState[6] < geodeRobotObsCost)
            {
                let clonedState = structuredClone(newState);
                clonedState[0] -= obsRobotOreCost;
                clonedState[1] -= obsRobotClayCost;
                clonedState[6]++;
                
                if (!IsExistingState(clonedState, newStates))
                    newStates.push(clonedState);
            }
    
            if (newState[0] >= geodeRobotOreCost && newState[2] >= geodeRobotObsCost)
            {
                let clonedState = structuredClone(newState);
                clonedState[0] -= geodeRobotOreCost;
                clonedState[2] -= geodeRobotObsCost;
                clonedState[7]++;
                
                if (!IsExistingState(clonedState, newStates))
                    newStates.push(clonedState);
            }
        }

        states = newStates;
    }

    if (part2)
    {
        product *= maxGeodes;
        if (blueprintIndex == 3)
            break;
    }
    else
        sum += blueprintIndex * maxGeodes;
}

if (part2)
    console.log(product);
else
    console.log(sum);
