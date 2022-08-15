const sumTwo = (a: number, b: number) => {
  return a + b;
};

console.log(sumTwo(5, 6));

let isCool: boolean = true;

let age: number = 56;

let eyeColor: string = 'brown';
let favQuote: string = `I'm not old, I'm only ${age}`;

let pets: string[] = ['cat', 'dog', 'chicken'];
let pets2: Array<string> = ['lion', 'dragon', 'lizard'];

let wizard: object = {
  a: 'Omar',
};

let huh: undefined = undefined;

let nil: null = null;

// Tuple

let basket: [string, number] = ['basketball', 5];

// Enum

enum Size {
  Small = 1,
  Medium = 2,
  Large = 3,
}
let sizeName: string = Size[2];
console.log(sizeName);

// Any
let whatever: any = 'nooo';

// void

let talk = (): void => {
  console.log('blah blah');
};

// never

let error = (): never => {
  throw Error('oops');
};

// Interface
interface RobotArmy {
  count: number;
  type: string;
  magic?: string;
}

let fightRobotArmy = (robots: RobotArmy) => {
  console.log('FIGHT');
};

let fightRobotArmy2 = (robots: {
  count: number;
  type: string;
  magic: string;
}) => {
  console.log('FIGHT');
};

// Type Assersion
interface CatArmy {
  count: number;
  type: string;
  magic: string;
}

let dog = {} as CatArmy;
dog.count = 5;

// Function
let fightRobotArmy3 = (robots: RobotArmy): void => {};

let fightRobotArmy4 = (robots: {
  count: number;
  type: string;
  magic: string;
}): number => {
  console.log('FIGHT');
  return 5;
};

// Class
class Animal {
  private sing: string = 'lalala';
  constructor(sound: string) {
    this.sing = sound;
  }

  greet(): string {
    return `Hello ${this.sing}`;
  }
}

let lion = new Animal('RAAAWWR');
console.log(lion.greet());

// Union
let confused: string | number | true = true;
