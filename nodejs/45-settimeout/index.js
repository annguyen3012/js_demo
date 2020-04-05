function doAfter(c, t) { 
    return new Promise((resolve, reject) => { 
        setTimeout(resolve, t) }).then(c); 
} 

sayHello = () => console.log('Hello');
sayGoodbye = () => console.log('Goodbye');


doAfter(sayHello, 1000).then(sayGoodbye);

// Expect:
// Wait 1s
// Hello
// Goodbye