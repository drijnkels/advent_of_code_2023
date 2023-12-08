// Boilerplate
const fs = require('fs');
 
// Grab data
const inputFile = fs.readFileSync('./day5/test.txt', 'utf8');
// const inputFile = fs.readFileSync('./day5/data.txt', 'utf8');

// Make data usable
// const inputs = inputFile.split(/\n/); // Split file into array line by line
const inputs = [
  '22222 765', // Five of a kind
  'AA2AA 684', // Four of a kind
  '23332 28', // Full house
  '32332 220', // Full house
  'TT98T 110', // Three of a kind
  '23432 10', // Two pair
  'A23A4 304', // One pair
  '234AK 256', // High card
  'AAAAA 800', // Five of a kind
]
const inputLength = inputs.length;
// console.log(inputLength);


const getHandType = (hand: string) => {
  // Pattern matching regexes
  const fiveRe = /([A-Z]|\d)\1{4}/;
  const fourRe = /([A-Z]|\d)\1{3}/;
  const fullHouse1 = /([A-Z]|\d)\1{2}([A-Z]|\d)\2{1}/;
  const fullHouse2 = /([A-Z]|\d)\1{1}([A-Z]|\d)\2{2}/;
  const threeRe = /([A-Z]|\d)\1{2}/;
  const twoPairRe = /([A-Z]|\d)\1{1}([A-Z]|\d)\2{1}/;
  const onePairRe = /([A-Z]|\d)\1{1}/;

  if (hand.match(fiveRe)) {
    // console.log('Five of a kind', hand);
    return 7;
  }

  const cards = hand.split('').sort().join('');
  if (cards.match(fourRe)) {
    // console.log('Four of a kind', cards);
    return 6;
  }

  if (cards.match(fullHouse1) || cards.match(fullHouse2)) {
    // console.log('Fullhouse', cards);
    return 5;
  }

  if (cards.match(threeRe)) {
    // console.log('Three of a kind', cards);
    return 4;
  }

  if (cards.match(twoPairRe)) {
    // console.log('Two pair', cards);
    return 3;
  }

  if (cards.match(onePairRe)) {
    // console.log('One pair', cards);
    return 2;
  }

  // console.log('High card', cards);
  return 1;
}

const part1 = () => {
  let score = 0;

  interface Hand {
    hand: string,
    type: number,
    rank: number,
    bid: number
  }
  const hands = [];

  // Test each hand for type
  for (let hand of inputs) {
    const hand_data = hand.split(' ');
    hands.push({
      hand: hand_data[0],
      type: getHandType(hand_data[0]),
      rank: 0,
      bid: parseInt(hand_data[1]),
      score: 0
    })
  }

  // Order hands based on type
  const compareHands = (a: Hand, b: Hand) => {
    return a.type - b.type;
  }
  hands.sort(compareHands);

  // Rank hands
  for (let rank = hands.length - 1; rank >= 0; rank--) {
    const current_hand = hands[rank];
    const same_type_hands = hands.filter((hand) => hand.type == current_hand.type);
    console.log('same hands as ' + rank, same_type_hands);

    if (same_type_hands.length == 1) {
      hands[rank].rank = rank + 1;
      // Multiply rank of each hand by their bit
      hands[rank].score = current_hand.bid * (rank + 1);
    } else { 
      // Compare same type hands here

    }

    rank -= same_type_hands.length - 1;
  }


  console.log(hands);
  // Add up the scores of each hand

  // Return score
  return score;
}

const part1_answer = part1();
console.log('Part 1 answers ' + part1_answer);