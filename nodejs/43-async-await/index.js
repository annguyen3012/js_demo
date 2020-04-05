// const fs = require('fs')
// const axios = require('axios')

// var run = async () => {
//     await fs.readFile('./data.json', {encoding: 'utf8'}, (err, data) => {
//         err ? console.log(err) : console.log(data);
//     });
//     await axios.get('https://jsonplaceholder.typicode.com/todos/1')
//     .then((res) => {
//       console.log(res.data);
//     });
// }

// run();

const axios = require('axios');

// Giải thích điểm khác nhau giữa 1 và 2:
// 1.
async function fetchUrls(urls) {
  const results = [];
  for (const url of urls) {
    const res = await axios.get(url);
    results.push(res);
  }
  return results;
}

// 2.
async function fetchUrlsParallel(urls) {
  const results = await Promise.all(
    urls.map(function(url) {
      return axios.get(url);
    })
  );
  return results;
}

// Chạy thử 2 hàm trên với đầu vào dưới đây và so sánh tốc độ
const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3'
];

fetchUrls(urls).then(() => console.log('Done'));
fetchUrlsParallel(urls).then(() => console.log('Done 2'));