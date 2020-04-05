// const generatePassword = require('password-generator');
// const markdown = require( "markdown" ).markdown;

// console.log(generatePassword(8));

// var markdownText = 'Hello *Coders.Tokyo*!';
// console.log( markdown.toHTML(markdownText) );

var dateFormat = require('dateformat');
var now = new Date();

// Basic usage
console.log(dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT"));
let code = `{
                "a": "String",
                "b" : true
            }`

console.log(typeof code);
try {
    let json = JSON.parse(code)
    console.log(typeof json);
} catch (error) {
    console.log(error);
}
