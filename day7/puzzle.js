"use strict";
// Boilerplate
const fs = require('fs');
// Grab data
// const inputFile = fs.readFileSync('./day7/test.txt', 'utf8');
// const inputFile = fs.readFileSync('./day7/test2.txt', 'utf8'); // should return 6592
const inputFile = fs.readFileSync('./day7/data.txt', 'utf8');
// Make data usable
const inputs = inputFile.split(/\n/); // Split file into array line by line
const inputLength = inputs.length;
const handTypes = {
    five: [],
    four: [],
    fullhouse: [],
    three: [],
    two: [],
    one: [],
    high: []
};
const getHandType = (hand) => {
    // Pattern matching regexes
    const fiveRe = /([A-Z]|\d)\1{4}/;
    const fourRe = /([A-Z]|\d)\1{3}/;
    const fullHouse1 = /([A-Z]|\d)\1{2}([A-Z]|\d)\2{1}/;
    const fullHouse2 = /([A-Z]|\d)\1{1}([A-Z]|\d)\2{2}/;
    const threeRe = /([A-Z]|\d)\1{2}/;
    const twoPairRe = /([A-Z]|\d)\1{1}(?:.*)([A-Z]|\d)\2{1}/;
    const onePairRe = /([A-Z]|\d)\1{1}/;
    if (hand.match(fiveRe)) {
        handTypes.five.push(hand);
        return 7;
    }
    const cards = hand.split('').sort().join('');
    if (cards.match(fourRe)) {
        handTypes.four.push(cards);
        return 6;
    }
    if (cards.match(fullHouse1) || cards.match(fullHouse2)) {
        handTypes.fullhouse.push(cards);
        return 5;
    }
    if (cards.match(threeRe)) {
        handTypes.three.push(cards);
        return 4;
    }
    if (cards.match(twoPairRe)) {
        handTypes.two.push(cards);
        return 3;
    }
    if (cards.match(onePairRe)) {
        handTypes.one.push(cards);
        return 2;
    }
    // handTypes.high.push(cards);
    return 1;
};
// Translate letter cards to a value
const cardValues = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10
};
// Return all the values in an array for each card in a hand
const getCardValues = (hand) => {
    const cardsInHand = hand.split('');
    const values = [];
    for (let card of cardsInHand) {
        if (isNaN(parseInt(card))) {
            values.push(cardValues[card]);
        }
        else {
            values.push(parseInt(card));
        }
    }
    return values;
};
// Order hands based on type
const compareHands = (a, b) => {
    if (a.type != b.type) {
        return a.type - b.type;
    }
    for (let i = 0; i < 5; i++) {
        if (a.cardValues[i] != b.cardValues[i]) {
            return a.cardValues[i] - b.cardValues[i];
        }
    }
    return 0;
};
const part1 = () => {
    let score = 0;
    const hands = [];
    // Test each hand for type
    for (let hand of inputs) {
        const hand_data = hand.split(' ');
        hands.push({
            hand: hand_data[0],
            type: getHandType(hand_data[0]),
            rank: 0,
            bid: parseInt(hand_data[1]),
            score: 0,
            cardValues: getCardValues(hand_data[0])
        });
    }
    hands.sort(compareHands);
    // Rank hands
    for (let rank = hands.length - 1; rank >= 0; rank--) {
        const current_hand = hands[rank];
        const actual_rank = rank + 1;
        hands[rank].rank = actual_rank;
        // Multiply rank of each hand by their bit
        hands[rank].score = current_hand.bid * actual_rank;
        score += current_hand.bid * actual_rank;
    }
    // Return score
    return score;
};
const part1_answer = part1();
console.log('Part 1 answers ' + part1_answer);
