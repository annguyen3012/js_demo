const readlineSync = require('readline-sync');
const fs = require('fs');

let contacts = JSON.parse(fs.readFileSync('./data.json', { encoding: 'utf8' }));

main = () => {
    console.log('1: Show list contacts');
    console.log('2: Create contact');
    console.log('3: Edit contacts');
    console.log('4: Delete contact');
    console.log('5: Search contact');
    chooseOption()
}

chooseOption = () => {
    let option = readlineSync.question("> ");
    switch (option) {
        case "1":
            showContacts(contacts)
            chooseOption()
            break;
        case "2":
            createContact()
            chooseOption()
            break;
        case "3":
            id = readlineSync.question("What phonebook do you want to edit? ");
            number = parseInt(id) - 1
            editContact(number)
            chooseOption()
            break;
        case "4":
            id = readlineSync.question("What phonebook do you want to delete? ");
            number = parseInt(id) - 1
            removeContact(number)
            chooseOption()
            break;
        case "5":
            let search = readlineSync.question("Search: ");
            searchContacts(search);
            chooseOption()
            break;
        default:
            console.log("Exit");
            break;
    }
}

showContacts = (listContacts) => {
    console.log("Name \t \t Phone Number");
    for (val of listContacts) {
        console.log(`${val.name} \t \t ${val.phoneNumber}`);
    }
}

createContact = () => {
    let name = readlineSync.question("Name: ");
    let phoneNumber = readlineSync.question("Phone Number: ");
    let contact = {name: name, phoneNumber: phoneNumber}
    contacts.push(contact)
    fs.writeFileSync('./data.json', JSON.stringify(contacts))
}

removeContact = (id) => {
    try {
        contacts.splice(id, 1)
        fs.writeFileSync('./data.json', JSON.stringify(contacts))
    } catch (error) {
        console.log("Contact was not found");
    }
}

editContact = (id) => {
    try {
        console.log("Name \t \t Phone Number");
        console.log(`${contacts[id].name} \t \t ${contacts[id].phoneNumber}`);
        let name = readlineSync.question("Update Name: ");
        let phoneNumber = readlineSync.question("Update Phone Number: ");
        contacts[id].name = name
        contacts[id].phoneNumber = phoneNumber
        fs.writeFileSync('./data.json', JSON.stringify(contacts))
    } catch (error) {
        console.log("Contact was not found");
    }
}

searchContacts = (search) => {
    newSearch = regexStr(search).toUpperCase()
    console.log(newSearch);
    let searchContacts = contacts.filter(x => regexStr(x.name).toUpperCase().includes(newSearch) || x.phoneNumber.toUpperCase().includes(newSearch));
    showContacts(searchContacts)
}

function regexStr(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

main()