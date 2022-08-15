var sumTwo = function (a, b) {
    return a + b;
};
console.log(sumTwo(5, 6));
var isCool = true;
var age = 56;
var eyeColor = 'brown';
var favQuote = "I'm not old, I'm only ".concat(age);
var pets = ['cat', 'dog', 'chicken'];
var pets2 = ['lion', 'dragon', 'lizard'];
var wizard = {
    a: 'Omar'
};
var huh = undefined;
var nil = null;
// Tuple
var basket = ['basketball', 5];
// Enum
var Size;
(function (Size) {
    Size[Size["Small"] = 1] = "Small";
    Size[Size["Medium"] = 2] = "Medium";
    Size[Size["Large"] = 3] = "Large";
})(Size || (Size = {}));
var sizeName = Size[2];
console.log(sizeName);
// Any
var whatever = 'nooo';
// void
var talk = function () {
    console.log('blah blah');
};
// never
var error = function () {
    throw Error('oops');
};
var fightRobotArmy = function (robots) {
    console.log('FIGHT');
};
var fightRobotArmy2 = function (robots) {
    console.log('FIGHT');
};
var dog = {};
dog.count = 5;
// Function
var fightRobotArmy3 = function (robots) { };
var fightRobotArmy4 = function (robots) {
    console.log('FIGHT');
    return 5;
};
// Class
var Animal = /** @class */ (function () {
    function Animal(sound) {
        this.sing = 'lalala';
        this.sing = sound;
    }
    Animal.prototype.greet = function () {
        return "Hello ".concat(this.sing);
    };
    return Animal;
}());
var lion = new Animal('RAAAWWR');
console.log(lion.greet());
// Union
var confused = true;
