"use strict";

const calcAverage = (a, b, c) => (a + b + c) / 3;

const checkWinner = (avgDolphins, avgKoalas) => {
  if (avgDolphins >= avgKoalas * 2) {
    console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
  } else if (avgKoalas >= avgDolphins * 2) {
    console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
  } else {
    console.log("No winner.");
  }
};

const avgDolphins = calcAverage(44, 23, 71);
const avgKoalas = calcAverage(65, 54, 49);

checkWinner(avgDolphins, avgKoalas);

// Challenge #2
const calcTip = (bill) =>
  bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

console.log(calcTip(100));

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const total = [
  bills[0] + calcTip(bills[0]),
  bills[1] + calcTip(bills[1]),
  bills[2] + calcTip(bills[2]),
];

// Challenge #3

const mark = {
  firstName: "Mark",
  lastName: "Miller",
  mass: 78,
  height: 1.69,
  calcBMI: function () {
    this.bmi = (this.mass / this.height ** 2).toFixed(2);
    return this.bmi;
  },
};

const john = {
  firstName: "John",
  lastName: "Smith",
  mass: 92,
  height: 1.95,
  calcBMI: function () {
    this.bmi = (this.mass / this.height ** 2).toFixed(2);
    return this.bmi;
  },
};

console.log(
  mark.bmi > john.bmi
    ? `${mark.firstName} ${
        mark.lastName
      }'s BMI (${mark.calcBMI()}) is higher than ${john.firstName} ${
        john.lastName
      }'s (${john.calcBMI()})`
    : `${john.firstName} ${
        john.lastName
      }'s BMI (${john.calcBMI()}) is higher than ${mark.firstName} ${
        mark.lastName
      }'s (${mark.calcBMI()})`
);

// Challenge #4

const bills2 = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips2 = [];
const totals = [];

for (let i = 0; i < bills2.length; i++) {
  tips2.push(calcTip(bills2[i]));
  totals.push(bills2[i] + tips2[i]);
}

const calcAverage2 = (arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  const avg = sum / arr.length;
  console.log(avg);
  return avg;
};

console.log(bills2, tips2, totals);
calcAverage2(totals);
calcAverage2(tips2);
