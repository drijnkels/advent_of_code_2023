// Boilerplate
const fs = require('fs');

// Grab data
// const inputFile = fs.readFileSync('./day3/test_p1.txt', 'utf8');
const inputFile = fs.readFileSync('./day3/data.txt', 'utf8');

// Make data usable
const inputs = inputFile.split(/\n/); // Split file into array line by line
const inputLength = inputs.length;
// console.log(inputLength);

// Regex to remove alpha characters
const az_regex = /[A-Za-z]/g
const number_regex = /\d+/g;

// Part 1
const part1 = () => {
  // Regex to find any character that is not a .
  const symbol_regex = /[^.]/g;
  let engine_sum = 0;

  for (let i = 0; i < inputs.length; i++){
    let row = inputs[i];
    // Find all numbers in a row
    const numbers_in_row = row.match(number_regex);

    // Ignore rows without numbers
    if(!numbers_in_row){
      continue;
    }
    
    // For each number check the row above, same row and below for symbols
    for (let number of numbers_in_row) {
      const number_index = row.indexOf(number); // Start of number
      const number_length = number.length;
      
      // Store number indexes to be used in row slices
      const left_index = (number_index != 0) ? number_index -1 : 0;
      const right_index = (number_index + number_length < row.length - 1) ? number_index + number_length : number_index + number_length;

      // Check above number
      if (i != 0) {
        const row_above = inputs[i - 1];
        const relevant_cells = row_above.slice(left_index, (right_index + 1));

        if (relevant_cells.match(symbol_regex)) {
          engine_sum += parseInt(number);
          row = row.replace(number, (m) => Array(number_length + 1).join("."));
          continue;
        }
      }

      // Check left side
      if (number_index != 0) {
        const relevant_cells = row[left_index];

        if (relevant_cells.match(symbol_regex)) {
          engine_sum += parseInt(number);
          row = row.replace(number, (m) => Array(number_length + 1).join("."));
          continue;
        }
      }

      // Check right
      if (row.length > number_index + number_length) {
        const relevant_cells = row[right_index];
        
        if (relevant_cells.match(symbol_regex)) {
          engine_sum += parseInt(number);
          row = row.replace(number, (m) => Array(number_length + 1).join("."));
          continue;
        }
      }

      // Check row below number
      if (i < inputs.length - 1) {
        const row_below = inputs[i + 1];
        const relevant_cells = row_below.slice(left_index, (right_index + 1));
        
        if (relevant_cells.match(symbol_regex)) {
          engine_sum += parseInt(number);
          row = row.replace(number, (m) => Array(number_length + 1).join("."));
          continue;
        }
      }

      // Replace the number with . to prevent checking the same number in a row twice
      row = row.replace(number, (m) => Array(number_length + 1).join("."));
    }
  }

  return engine_sum;
}

// Part 2 
const part2 = () => {
  let gear_ratio_sum = 0;

  // Find all part numbers and their start & end indexes
  const part_numbers = [];
  for (let r = 0; r < inputs.length; r++) {
    part_numbers.push([]);

    let row = inputs[r];
    let number_data;
    while ( (number_data = number_regex.exec(row)) !== null) {
      part_numbers[r].push({
        number: number_data[0],
        index: number_data.index,
        index_end: (number_data.index + number_data[0].length) - 1
      })
    }
  }

  // Loop over all rows, find and test each gear
  for (let i = 0; i < inputs.length; i++){
    let row = inputs[i];

    // Current gear being checked
    let gear_index;
    // Store the next index the regex has to start searching from
    let next_index = 0;
    // Store connecting part numbers
    let adj_part_numbers = [];
    while ( (gear_index = row.indexOf('*', next_index)) !== -1) {
      // Reset part number array for each gear
      adj_part_numbers = [];

      // Combine all relevant part numbers of the row above, same row and below into a single array to loop over
      let relevant_rows = part_numbers[i-1].concat(part_numbers[i], part_numbers[i+1]);
      for (let part_number of relevant_rows) {
        // Take advantage of the fact that partnumbers are a max of 3 numbers long
        // This means we only have to check for the beginning and end of a number to see if it connects
        if (
          Math.abs(part_number.index - gear_index) < 2 ||
          Math.abs(part_number.index_end - gear_index) < 2
        ) {
          adj_part_numbers.push(part_number.number);
        }
      }
      // For debugging purposes display the matches found
      // console.log('Adjacent partnumbers', adj_part_numbers);
      
      // If we have 2 matching part numbers we can multiply them and add them to the gear ratio sum
      if (adj_part_numbers.length == 2) {
        gear_ratio_sum += parseInt(adj_part_numbers[0]) * parseInt(adj_part_numbers[1]);
      }

      // Advance the regex search past the current gear
      next_index = gear_index + 1;
    }
  }

  return gear_ratio_sum;
}

// Part 1 find engine part numbers
// const engine_sum = part1();
// console.log('Engine sum: ' + engine_sum);

// Part 2 find gear ratios
const gear_ratio_sum = part2();
console.log('Gear ratio sum ' + gear_ratio_sum);