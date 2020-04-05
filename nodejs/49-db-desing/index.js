const readlineSync = require('readline-sync');
const moment = require('moment');
const fs = require('fs');

const ONE_DAY_BY_MS = 86400;

readFilePromise = path => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, {encoding: 'utf-8'}, (err, data) => {
            return err ? reject(err) : resolve(data)
        });
    });
}

readFilePromiseById = (path, id) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, {encoding: 'utf-8'}, (err, data) => {
            newData = JSON.parse(data)
            result = newData.find(x => x.id == id)
            return err ? reject(err) : resolve(result)
        });
    }); 
}

var books = []

var students = []

var histories = []

var expires = []
Promise.all([
    readFilePromise('./data/books.json'),
    readFilePromise('./data/students.json'),
    readFilePromise('./data/histories.json'),
    readFilePromise('./data/expires.json')
]).then(data => {
    books = data[0].length != 0 ? JSON.parse(data[0]) : [];
    students = data[1].length != 0 ? JSON.parse(data[1]): [];
    histories = data[2].length != 0 ? JSON.parse(data[2]) : [];
    expires = data[3].length != 0 ? JSON.parse(data[3]) : [];
    main();
}).catch(err => console.log(err));

main = () => {
    console.log('1: Show list book');
    console.log('2: Show list book');
    console.log('3: Create user');
    console.log('4: Borrow book');
    console.log('5: Show histories');
    console.log('6: Show expires');
    chooseOption()
}

chooseOption = () => {
    let option = readlineSync.question("> ");
    switch (option) {
        case "1":
            showBooks()
            chooseOption()
            break;
        case "2":
            showStudents()
            chooseOption()
            break;
        case "3":
            createUser()
            break;
        case "4":
            bookId = readlineSync.question("Book ID: ");
            studentId = readlineSync.question("Student ID: ");
            expireTime = readlineSync.question("ExpireTime: ");
            borrowBook(studentId, bookId, expireTime)
            chooseOption()
            break;
        case "5":
            showHistories()
            break;
        case "6":
            showExpired();
            chooseOption()
            break;
        default:
            console.log("Exit");
            break;
    }
}

showBooks = () => {
    console.log("Id \t \t Name");
    for (val of books) {
        console.log(`${val.id} \t \t ${val.name}`);
    }
}

showStudents = () => {
    console.log("Id \t \t Name");
    for (val of students) {
        console.log(`${val.id} \t \t ${val.name}`);
    }
}
createUser = () => {
    id = students[students.length - 1].id + 1
    let name = readlineSync.question("Name: ");
    let student = {id: id, name: name};
    students.push(student);
    fs.writeFileSync('./data/students.json', JSON.stringify(students));
}

showHistories = async () => {
    for (val of histories) {
        bookName = null
        studentName = null
        await readFilePromiseById('./data/books.json', val.bookId).then(x => x != undefined ? bookName = x.name : bookName)
        await readFilePromiseById('./data/students.json', val.studentId).then(x => x != undefined ? studentName = x.name : studentName)
        
        if (bookName != null && studentName != null) {
            console.log(`${val.id} \t \t ${bookName} \t \t ${studentName} \t \t ${val.borrow_time} \t \t ${val.resend_time} \t \t ${val.expire_time}`);
        }
    }
    chooseOption()
}

borrowBook = (studentId, bookId, expireTime) => {
    book = books.find(x => x.id === parseInt(bookId));
    student = students.find(x => x.id === parseInt(studentId));
    if (book == undefined || student == undefined) {
        console.log("Can't not find the book or student");
    } else {
        if (book.status === 1) {
            console.log("The book was borrowed");
        } else {
            nowHistory = moment().format('DD-MM-YYYY')
            timeAfter = moment(nowHistory, 'DD-MM-YYYY').add(expireTime, 'days')
            expireHistory = timeAfter.format('DD-MM-YYYY') 
            id = histories[histories.length - 1] ? histories[histories.length - 1].id + 1 : 1
            history = {
                id: id,
                studentId: studentId,
                bookId: bookId,
                borrow_time: nowHistory,
                resend_time: null,
                expire_time: expireHistory,
            }
            histories.push(history)
            fs.writeFileSync('./data/histories.json', JSON.stringify(histories));
            books.map(x => x.id == parseInt(bookId) ? x.status = 1 : 0);
            fs.writeFileSync('./data/books.json', JSON.stringify(books));
        }
    }
}

showExpired = async() => {
    cronJobExpireDays()
    for (val of expires) {
        studentName = null
        await readFilePromiseById('./data/students.json', val.studentId).then(x => x != undefined ? studentName = x.name : studentName)
        
        if (studentName != null) {
            console.log(`${val.id} \t \t ${studentName} \t \t ${val.expire_date}`);
        }
    }
    chooseOption()
}

cronJobExpireDays = () => {
    id = expires[expires.length - 1] ? expires[expires.length - 1].id + 1 : 1
    histories.filter( x => {
        expireDay = moment().diff(x.expire_time, 'days')
        if (x.resend_time == null && expireDay > 0) {
            expire = {
                id: id,
                studentId: x.studentId,
                expire_date: expireDay
            }
            expires.push(expire);
        }
    }); 
    fs.writeFileSync('./data/expires.json', JSON.stringify(expires));
};

