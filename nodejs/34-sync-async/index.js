// var rp = require('request-promise');

// rp('https://randomuser.me/api/')
//     .then(function (htmlString) {
//         // Process html...
//         console.log('Done', htmlString);
//     })
//     .catch(function (err) {
//         // Crawling failed...
//         console.log(err);
//     });

// const fs = require('fs')

// readFilePromise = (path) => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(path, {encoding: 'utf8'}, (err, data) => {
//             return err ? reject(err) : resolve(data)
//         });
//     });
// };

// readFilePromise('./package.json')
const axios = require('axios');

function getLink1() {
    return axios.get('https://jsonplaceholder.typicode.com/todos/1');
}

function getLink2() {
    return axios.get('https://jsonplaceholder.typicode.com/todos/2');
}


function getLink(link) {
    return axios.get(link);
}
// axios.all([getLink1(), getLink2()])
//     .then(axios.spread(function (acct, perms) {
//         // Both requests are now complete
//         console.log(acct.data, perms.data);
//     }));

Promise.all([getLink('https://jsonplaceholder.typicode.com/todos/1'), getLink('https://jsonplaceholder.typicode.com/todos/2'), getLink('https://jsonplaceholder.typicode.com/todos/3')])
    .then((values) => {
        let results = values.map(x => x.data)
        console.log(results);
    })
    .catch((err) => {
        console.log(err);
    })
