// var Mouse = require("./mouse");
// var Cat = require("./cat");

// var jenry = new Mouse("Jenry", "orange");
// var mickey = new Mouse("Mickey", "black and white");
// var tom = new Cat();
// tom.eat(jenry);
// console.log(jenry, mickey, tom);

var Circle = require('./cat');

var circle1 = new Circle(0, 0, 1);
var circle2 = new Circle(0, 2, 1);
console.log(circle1.isOverlapped(circle2));

var circle3 = new Circle(0, 0, 3);
console.log(circle1.isOverlapped(circle3));

var circle4 = new Circle(5, 5, 1);
console.log(circle1.isOverlapped(circle4));
