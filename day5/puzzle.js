"use strict";
// Boilerplate
const fs = require('fs');
// Grab data
const inputFile = fs.readFileSync('./day5/test.txt', 'utf8');
// const inputFile = fs.readFileSync('./day5/data.txt', 'utf8');
// Make data usable
const inputs = inputFile.split(/\n\n/); // Split file into array line by line
const inputLength = inputs.length;
// console.log(inputLength);
let seeds = inputs[0].split(':')[1].trim().split(' ').map((d) => parseInt(d)).slice(0, 2);
const maps = [];
for (let map of inputs.slice(1)) {
    const lines = map.split(/\n/);
    maps.push({
        name: lines[0],
        lines: lines.slice(1)
    });
}
// console.log(seeds);
// console.log(maps);
// Regex to remove alpha characters
const az_regex = /[A-Za-z]/g;
const number_regex = /\d+/g;
// Part 1
const part1 = () => {
    let lowest_loc = Infinity;
    for (let seed of seeds) {
        // Store our current source number
        let source_number = seed;
        // const seed_map = [{
        //   name: 'Seed',
        //   destination: source_number
        // }];
        // Loop through all map types
        for (let map of maps) {
            // Loop through all number ranges in a map
            for (let line of map.lines) {
                // Grab the numbers for each line and convert them from string to numbers
                const line_numbers = line.split(' ').map((d) => parseInt(d));
                // Test to see if our current source_number falls into a range
                if (source_number >= line_numbers[1] && source_number < (line_numbers[1] + line_numbers[2])) {
                    // If so calculate how far into the range our numbers falls
                    const source_diff = source_number - line_numbers[1];
                    // And apply the same difference to the destination number
                    source_number = line_numbers[0] + source_diff;
                    break;
                }
            }
            // Debugging track a seed from seed to location with all steps in between
            // seed_map.push({
            //   name: map.name.split('-')[2].replace(' map', ''),
            //   destination: source_number
            // });
        }
        // console.log(seed_map);
        // If the location of a seed is lower than the current lowest we store the new location value
        if (source_number < lowest_loc) {
            lowest_loc = source_number;
        }
    }
    return lowest_loc;
};
// Part 2 
const part2 = () => {
    let lowest_loc = Infinity;
    for (let sr = 0; sr < seeds.length; sr += 2) {
        let seed = seeds[sr];
        let range = seeds[sr + 1];
        // console.log(seed);
        // console.log(range);
        // continue;
        for (let s = seed; s < seed + range; s++) {
            // Store our current source number
            let source_number = s;
            // const seed_map = [{
            //   name: 'Seed',
            //   destination: source_number
            // }];
            // Loop through all map types
            for (let map of maps) {
                // Loop through all number ranges in a map
                for (let line of map.lines) {
                    // Grab the numbers for each line and convert them from string to numbers
                    const line_numbers = line.split(' ').map((d) => parseInt(d));
                    // Test to see if our current source_number falls into a range
                    if (source_number >= line_numbers[1] && source_number < (line_numbers[1] + line_numbers[2])) {
                        // If so calculate how far into the range our numbers falls
                        const source_diff = source_number - line_numbers[1];
                        // And apply the same difference to the destination number
                        source_number = line_numbers[0] + source_diff;
                        break;
                    }
                }
                // Debugging track a seed from seed to location with all steps in between
                // seed_map.push({
                //   name: map.name.split('-')[2].replace(' map', ''),
                //   destination: source_number
                // });
            }
            // console.log(seed_map);
            // If the location of a seed is lower than the current lowest we store the new location value
            if (source_number < lowest_loc) {
                lowest_loc = source_number;
            }
        }
    }
    return lowest_loc;
};
// Find the closest location to plant a seed
// const closest_location = part1();
// console.log('Closet location: ' + closest_location);
/// Find the closest location to plant a seed
const closest_location = part2();
console.log('Closet location: ' + closest_location);
