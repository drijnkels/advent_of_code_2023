// Boilerplate
const fs = require('fs');

// Grab data
// const inputFile = fs.readFileSync('./day2/test_p1.txt', 'utf8');
const inputFile = fs.readFileSync('./day2/data_p1.txt', 'utf8');

// Make data usable
const inputs = inputFile.split(/\n/); // Split file into array line by line
const inputLength = inputs.length;

// Regex to remove alpha characters
const az_regex = /[A-Za-z]/g

// Part 1
const part1 = () => {
  let sum_ids = 0;
  const colour_limits = {red: 12, green: 13, blue: 14};

  for (let game of inputs) {
    const game_data = game.split(':');
    const subsets = game_data[1].split(';');
    let valid_game = true;

    // Grab game ID
    const game_id = parseInt(game_data[0].replace(az_regex, ''));

    // Loop throuht all subsets in a game
    for (let subset of subsets) {
      const cubes = subset.split(',');

      // Loop through all colours in a subset and test them
      for (let colour_cubes of cubes) {
        const colour_info = colour_cubes.trim().split(' ');
        // console.log(colour_info);
        if (parseInt(colour_info[0]) > colour_limits[colour_info[1]]) {
          valid_game = false;
          console.log('Game: ' + game_id + ' surpassed color limit (' + colour_limits[colour_info[1]] + ') on ' + colour_info[1] + ' with ' + colour_info[0]);
          break;
        }
      }

      // End loop early if the game is unable to be played with the given subsets
      if (!valid_game) {
        break;
      }
    }

    // Only count the valid games
    if (valid_game) {
      sum_ids += game_id;
    }
  }

  return sum_ids;
}

// Part 2 
const part2 = () => {
  let sum_powers = 0;

  for (let game of inputs) {
    // Store the minimum required number of cubes for each colour
    const colour_limits = {red: 0, green: 0, blue: 0};
    const game_data = game.split(':');
    const subsets = game_data[1].split(';');

    // Loop throuht all subsets in a game
    for (let subset of subsets) {
      const cubes = subset.split(',');

      // Loop through all colours in a subset and test if the number is bigger than the current minimum needed for a colour
      for (let colour_cubes of cubes) {
        const colour_info = colour_cubes.trim().split(' ');

        if (parseInt(colour_info[0]) > colour_limits[colour_info[1]]) {
          colour_limits[colour_info[1]] = parseInt(colour_info[0]);
        }
      }
    }

    // Add up all the minimums for each colour required to play this game
    sum_powers += colour_limits.red * colour_limits.green * colour_limits.blue;
  }

  return sum_powers;
}

// Part 1 only find digits
// const sum_ids = part1();
// console.log('Sum of ids: ' + sum_ids);

// Part 2 also find words
const sum_powers = part2();
console.log('Sum of powers: ' + sum_powers);