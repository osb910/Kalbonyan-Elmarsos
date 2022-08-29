let age: number = 25;

let userName: string;

userName = 'Max';

let isInstructor: boolean;

isInstructor = true;

// More complex

let hobbies: string[];

hobbies = ['Sports', 'Cooking'];

type Person = {
  name: string;
  age: number;
};

let person: Person;

person = {
  name: 'Max',
  age: 32,
};

let people: Person[];

let course: string | number = 'React - The Complete Guide';

course = 123;

// Functions && types

function add(a: number, b: number) {
  return a + b;
}

function print(value: any) {
  console.log(value);
}

// Generics

function insertAtBeginning<T>(arr: T[], value: T) {
  const newArray = [value, ...arr];
  return newArray;
}

const demoArray = [1, 2, 3];

const updatedArray = insertAtBeginning(demoArray, -1);
const stringArray = insertAtBeginning(['a', 'b', 'c'], 'd');

// updatedArray[0].split('');
