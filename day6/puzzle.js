// Boilerplate
const fs = require('fs');

// Grab data
// const inputFile = fs.readFileSync('./day6/test.txt', 'utf8');
const inputFile = fs.readFileSync('./day6/data.txt', 'utf8');

// Make data usable
const inputs = inputFile.split(/\n/); // Split file into array line by line
const inputLength = inputs.length;
// console.log(inputLength);

// Regex to remove alpha characters
const az_regex = /[A-Za-z]/g
const number_regex = /\d+/g;

const distance_traveled = (speed, time) => {
  return time * speed;
}

// Part 1
const part1 = () => {
  // Replace all the extra spaces to make the strings more easy to split
  const white_space_regex = / +/g;
  const times = inputs[0].replace(white_space_regex, ' ').split(' ');
  const records = inputs[1].replace(white_space_regex, ' ').split(' ');

  // Store the number of options per race
  let record_options = [];

  // Loop through all races to test the waiting times
  for (let i = 1; i < times.length; i++){
    // Store the waiting time for races won
    let hold_times_in_race = [];

    // Test how far the boat travels for each waiting time
    for (let t = 1; t < times[i]; t++) {
      const distance = distance_traveled(t, times[i] - t);
      if (distance > records[i]) {
        hold_times_in_race.push(t);
      }
    }

    record_options.push(hold_times_in_race.length);
  }

  // Recuce the options per race into a single number
  return record_options.reduce((accumulator, currentValue) => accumulator * currentValue);
}

// Part 2 
const part2 = () => {
  let number_of_options = 0;

  const white_space_regex = / +/g;
  const time = inputs[0].replace(white_space_regex, '').split(':')[1];
  const record = inputs[1].replace(white_space_regex, '').split(':')[1];

  let minimum_time = 0;
  // calculate the minimum amount of time first
  for (let t = 0; t < time; t++) {
    const distance = distance_traveled(t, time - t);
    if(distance > record) {
      minimum_time = t;
      break;
    }
  }

  // Then work backwards to find the maximum amount of wait time
  for (let t = parseInt(time); t > 1; t--) {
    const distance = distance_traveled(t, time - t);
    if (distance < record) {
      continue;
    }
    number_of_options = (t - minimum_time + 1);
    break;
  }
  
  return number_of_options;
}

// Part 1 find the scratch card points
// const part1_answer = part1();
// console.log('Answer part 1: ' + part1_answer);

// Part 2 count number of scratch cards
const part2_answer = part2();
console.log('Answer part 2: ' + part2_answer);