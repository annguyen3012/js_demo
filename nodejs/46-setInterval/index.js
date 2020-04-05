// countFrom = (a,b) => {
//   return new Promise((resolve, reject) => {
//     count = setInterval(() => {
//       console.log(a)
//       if (a < b) {
//         a++
//       } else {
//         clearInterval(count)
//         resolve()
//       }
//     }, 1000);
//   })
// }
  
// countFrom(4,10).then(() => console.log('Done'));

countDown = (x) => {
  return new Promise((resolve, reject) => {
    count = setInterval(() => {
      console.log(x)
      if (x > 0) {
        x --;
      } else {
        clearInterval(count)
        resolve()
      }
    }, 1000);
  })
}

sayHappyNewYear = () => console.log('Happy new year')

countDown(3).then(sayHappyNewYear);