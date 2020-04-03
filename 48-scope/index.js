
var a = 1;

// function foo() {
//   var a = 2;
//   return a;
// }

// function bar() {
//   a = 2;
//   console.log(a);
//   return a;
// }

// foo();
// console.log(a); // Kết quả?
// bar();
// console.log(a); // Kết quả?


var a = 1;

var b = {
  a: 2,
  foo: function() {
    console.log(this.a);
  }
};

b.foo();

var fooCopy = b.foo;
fooCopy();