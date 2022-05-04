'use strict';

let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log('I can drive :D');

function logger() {
  console.log('My name is Jonas');
}

// calling / tunning / invoking function
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

// Function declaration
function calcAge1(birthYear) {
  const age = 2037 - birthYear;
  return age;
}

const age1 = calcAge1(1991);
console.log(age1);

// Function expression
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};

const age2 = calcAge2(1991);
console.log(age1, age2);

// Arrow function
const calcAge3 = birthYear => 2037 - birthYear;
const age3 = calcAge3(1991);
console.log(age3);

function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);
  const juice = `Juice with ${applePieces} pieces of apples and ${orangePieces} pieces oranges.`;
  return juice;
}

console.log(fruitProcessor(2, 3));

const calcAge = function (birthYear) {
  return 2037 - birthYear;
};
const yearsUntilRetirement = function (birthYear, firstName) {
  const age = calcAge(birthYear);
  const retirement = 65 - age;
  if (retirement > 0) {
    console.log(`${firstName} retires in ${retirement} years`);
    return retirement;
  } else {
    console.log(`${firstName} has already retired`);
    return -1;
  }
};

console.log(yearsUntilRetirement(1991, 'Jonas'));
console.log(yearsUntilRetirement(1970, 'Mike'));

const y = new Array(1991, 1984, 2008, 2020);

const friends1 = ['Michael', 'Steven', 'Peter'];
const firstName = 'Jonas';
const jonas1 = [firstName, 'Schmedtmann', 2037 - 1991, 'teacher', friends1];
console.log(jonas1);
console.log(jonas1.length);

// Exercise

// Add elements
const years = [1990, 1967, 2002, 2010, 2018];
console.log(calcAge(years));

const ages = [
  calcAge(years[0]),
  calcAge(years[1]),
  calcAge(years[years.length - 1]),
];
console.log(ages);

const newLength = friends1.push('Jay');
console.log(friends1);
console.log(newLength);

friends1.unshift('John');
console.log(friends1);

// Remove elements
friends1.pop(); // Last
const popped = friends1.pop();
console.log(popped);
console.log(friends1);

friends1.shift(); // First
console.log(friends1);

console.log(friends1.indexOf('Steven'));
console.log(friends1.indexOf('Bob'));
friends1.push(23);
console.log(friends1.includes('Steven'));
console.log(friends1.includes('Bob'));
console.log(friends1.includes(23));

if (friends1.includes('Peter')) {
  console.log('You have a friend called Steven');
}

const jonas = {
  firstName: 'Jonas',
  lastName: 'Schmedtmann',
  birthYear: 1991,
  job: 'teacher',
  friends: ['Michael', 'Steven', 'Peter'],
  hasDriversLicense: true,
  // calcAge: function(birthYear) {
  //    return 2037 - birthYear;
  // }
  calcAge: function () {
    this.age = 2037 - this.birthYear;
    return this.age;
  },

  getSummary: function () {
    return `${
      this.firstName
    } is a ${this.calcAge()}-year old teacher, and he has ${
      this.hasDriversLicense ? 'a' : 'no'
    } driver's license`;
  },
};

console.log(jonas);
console.log(jonas.lastName);
console.log(jonas['lastName']);

const nameKey = 'Name';
console.log(jonas['first' + nameKey]);
console.log(jonas['last' + nameKey]);

const interestedIn = prompt(
  'What do you want to know aout Jonas? Choose between firstName, lastName, age, job, and friends'
);
console.log(jonas[interestedIn]);

if (jonas[interestedIn]) {
  console.log(console.log(jonas[interestedIn]));
} else {
  console.log(
    'Wrong request! Choose between firstName, lastName, age, job, and friends'
  );
}

jonas.location = 'Portugal';
jonas['twitter'] = '@jonasschmedtman';
console.log(jonas);

// Challenge
// 'Jonas has 3 friends, and his best friend is called Michael'

console.log(
  `${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}`
);

console.log(jonas.getSummary());

// console.log('Lifting weights repetition 1 🏋️‍♀️');
// console.log('Lifting weights repetition 2 🏋️‍♀️');
// console.log('Lifting weights repetition 3 🏋️‍♀️');
// console.log('Lifting weights repetition 4 🏋️‍♀️');
// console.log('Lifting weights repetition 5 🏋️‍♀️');
// console.log('Lifting weights repetition 6 🏋️‍♀️');
// console.log('Lifting weights repetition 7 🏋️‍♀️');
// console.log('Lifting weights repetition 8 🏋️‍♀️');
// console.log('Lifting weights repetition 9 🏋️‍♀️');
// console.log('Lifting weights repetition 10 🏋️‍♀️');

// for loop keeps running while condition is TRUE
for (let rep = 1; rep <= 30; rep++) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}

// Looping Arrays, Breaking and Continuing
const jonas2 = [
  'Jonas',
  'Schmedtmann',
  2037 - 1991,
  'teacher',
  ['Michael', 'Peter', 'Steven'],
  true,
];
const types = [];

for (let i = 0; i < jonas2.length; i++) {
  // Reading from jonas2 array
  console.log(jonas2[i], typeof jonas2[i]);

  // Filling types array
  // types[i] = typeof jonas2[i];
  types.push(typeof jonas2[i]);
}

console.log(types);

const years2 = [1991, 2007, 1969, 2020];
const ages2 = [];

for (let i = 0; i < years2.length; i++) {
  ages2.push(2037 - years2[i]);
}
console.log(ages2);

// continue and break
console.log('--- ONLY STRINGS ---');
for (let i = 0; i < jonas2.length; i++) {
  if (typeof jonas2[i] !== 'string') continue;

  console.log(jonas2[i], typeof jonas2[i]);
}

console.log('--- BREAK WITH NUMBER ---');
for (let i = 0; i < jonas2.length; i++) {
  if (typeof jonas2[i] === 'number') break;

  console.log(jonas2[i], typeof jonas2[i]);
}

///////////////////////////////////////
// Looping Backwards and Loops in Loops
const jonas3 = [
  'Jonas',
  'Schmedtmann',
  2037 - 1991,
  'teacher',
  ['Michael', 'Peter', 'Steven'],
  true,
];

// 0, 1, ..., 4
// 4, 3, ..., 0

for (let i = jonas3.length - 1; i >= 0; i--) {
  console.log(i, jonas3[i]);
}

for (let exercise = 1; exercise < 4; exercise++) {
  console.log(`-------- Starting exercise ${exercise}`);

  for (let rep = 1; rep < 6; rep++) {
    console.log(`Exercise ${exercise}: Lifting weight repetition ${rep} 🏋️‍♀️`);
  }
}

for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}

let rep = 1;
while (rep <= 10) {
  console.log(`WHILE: Lifting weights repetition ${rep} 🏋️‍♀️`);
  rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log('Loop is about to end...');
}
