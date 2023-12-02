// Boilerplate
const fs = require('fs');

// Grab data
// const inputFile = fs.readFileSync('./day1/test_p1.txt', 'utf8');
const inputFile = fs.readFileSync('./day1/data_p1.txt', 'utf8');
// const inputFile = fs.readFileSync('./day1/test_p2.txt', 'utf8');

// Make data usable
const inputs = inputFile.split(/\n/); // Split file into array line by line
const inputLength = inputs.length;

// Regex to remove alpha characters
const az_regex = /[A-Za-z]/g

// Part 1
const part1 = () => {
  let calibration_value = 0;

  for (let row of inputs) {
    // Remove all alpha characters
    const digits = row.replace(az_regex, '').split('');
    
    // Grab the first and last digit
    const row_digit = digits[0] + digits[digits.length - 1];

    calibration_value += parseInt(row_digit);
  }

  return calibration_value;
}

// Part 2 
const part2 = () => {
  let calibration_value = 0;
  const number_words = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9};

  for (let i = 0; i < inputLength; i++){
    let row = inputs[i];
    // All of our number options
    const search_digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

    // Store values for first and last digit
    let first_digit = false;
    let first_digit_index = Infinity;
    let last_digit = false;
    let last_digit_index = -1;

    // Loop through all number options and find the first and/or last occurence of a number,
    // use the position argument to only search the relevant part of the string
    for(let search_digit of search_digits){
      const digit_first_index = row.indexOf(search_digit);
      if (digit_first_index != -1 && digit_first_index < first_digit_index) {
        first_digit = (Number.isInteger(parseInt(row[digit_first_index]))) ? row[digit_first_index] : number_words[search_digit];
        first_digit_index = digit_first_index;
      }

      const digit_last_index = row.lastIndexOf(search_digit);
      if (digit_last_index != -1 && digit_last_index > last_digit_index) {
        last_digit = (Number.isInteger(parseInt(row[digit_last_index]))) ? row[digit_last_index] : number_words[search_digit];
        last_digit_index = digit_last_index;
      }
    }

    // console.log(row);
    // console.log('First digit ' + first_digit);
    // console.log('Last digit ' + last_digit);

    const line_value = first_digit + '' + last_digit;
    // console.log(line_value);
    
    // Add the value to the calibration value
    calibration_value += parseInt(line_value);
  }

  return calibration_value;
}

// Part 1 only find digits
// const calibration_value = part1();

// Part 2 also find words
const calibration_value = part2();

console.log('Calibration value: ' + calibration_value);