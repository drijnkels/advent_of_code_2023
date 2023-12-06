// Boilerplate
const fs = require('fs');

// Grab data
// const inputFile = fs.readFileSync('./day4/test.txt', 'utf8');
const inputFile = fs.readFileSync('./day4/data.txt', 'utf8');

// Make data usable
const inputs = inputFile.split(/\n/); // Split file into array line by line
const inputLength = inputs.length;
// console.log(inputLength);

// Regex to remove alpha characters
const az_regex = /[A-Za-z]/g
const number_regex = /\d+/g;

// Part 1
const part1 = () => {
  let point_total = 0;

  for (let row of inputs) {
    const card = row.split(':');
    const numbers = card[1].split('|');
    const winning_numbers_array = numbers[0].trim().split(' ');
    const elf_numbers_string = numbers[1].trim();

    let matches = 0;
    // let matched_numbers = [];
    for (let winning_number of winning_numbers_array) {
      // All digits take up 2 spaces eg. 7 is " 7", so we need to ignore empty array entries
      if (winning_number == '') {
        continue;
      }
      const match = '(\\D|^)'+winning_number+'(\\D|$)';
      const re = new RegExp(match, "g");
      if (elf_numbers_string.match(re)) {
        matches++;
        // matched_numbers.push(winning_number);
      }
    }
  
    if (matches > 1) {
      point_total += Math.pow(2, (matches -1));
    }else{
      point_total += matches;
    }
  }

  return point_total;
}

// Part 2 
const part2 = () => {
  let scratch_cards_sum = 0;
  const copies = {};
  // const required_copies = [1, 2, 4, 8, 14, 1];

  for (let r = 0; r < inputLength; r++ ) {
    const row = inputs[r];

    // Add the initial copy
    if (!copies[r]) {
      copies[r] = 1;
    } else { 
      copies[r] += 1;
    }

    // Make the scratch card data usable
    const card = row.split(':');
    const numbers = card[1].split('|');
    const winning_numbers_array = numbers[0].trim().split(' ');
    const elf_numbers_string = numbers[1].trim();

    // Find the number of matches for this card
    let matches = 0;
    for (let winning_number of winning_numbers_array) {
      // All digits take up 2 spaces eg. 7 is " 7", so we need to ignore empty array entries
      if (winning_number == '') {
        continue;
      }
      const match = '(\\D|^)'+winning_number+'(\\D|$)';
      const re = new RegExp(match, "g");
      if (elf_numbers_string.match(re)) {
        matches++;
      }
    }
  
    // console.log('Card ' + r + ' has ' + matches + ' matches and ' + copies[r] + ' copies');
    for (let m = 0; m < matches; m++) {
      if (!copies[r + (m+1)]) {
        copies[r + (m + 1)] = 1 * copies[r];
      } else {
        copies[r + (m + 1)] += 1 * copies[r];;
      }
    }

    // console.log(copies);
    // console.log(' ');
    // if (copies[r] != required_copies[r]) {
    //   console.log('Script failed at ' + r);
    //   break;
    // }
  }

  for (let key in copies) {
    scratch_cards_sum += parseInt(copies[key]);
  }
  return scratch_cards_sum;
}

// Part 1 find the scratch card points
// const point_total = part1();
// console.log('Points: ' + point_total);

// Part 2 count number of scratch cards
const scratch_cards_sum = part2();
console.log('Scratch cards ' + scratch_cards_sum);