const axios = require('axios').default;
const co = require('co');

getLink = (link) => {
    return axios.get(link)
        .then((value) => value.data)
};

var urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
    'https://jsonplaceholder.typicode.com/todos/3',
    'https://jsonplaceholder.typicode.com/todos/4',
    'https://jsonplaceholder.typicode.com/todos/5'
];

var getData = co.wrap(function*(links) {
    return yield links.map(link => getLink(link))
});

getData(urls)
    .then((data) => { console.log(data); })
    .catch((err) => {
        console.log(err);
    });

