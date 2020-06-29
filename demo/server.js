const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
}))

members = [];
app.get('/', (req, res) => {
    // res.json(members);
    res.render('list-user', {members: members.data});
});

app.get('/create-user', (req, res) => {
    res.render('create-user');
});

app.post('/create-user', (req, res) => {
    console.log(req.body.name)
    // member = {
    //     id: 1,
    //     name: req.body.name,
    //     email: req.body.email,
    //     avatar: req.file,
    //     role: email.req.body.role
    // }
    // console.log(member);
    // if (members.data) {
    //     length = members.data.length;
    //     member.id = members.data[length - 1].id + 1;
    //     console.log(member);
    //     members.data.push(member)        
    // } else {
    //     members.data = member  
    // }
    // const googleDriver = require('./google-driver')
    // fs.writeFileSync('./db.json',JSON.stringify(members))
    // res.json(members);    
});

// app.get('/member/:id/edit', (req, res) => {
//     let id = req.params.id
//     member = members.members.find(m => m.id == id);
//     if (member) {
//         res.json(member);           
//     } else {
//         res.json() 
//     }
// });

// app.put('/member/:id/update', (req, res) => {
//     let id = req.params.id
//     for (member of members.members) {
//         if (member.id == id) {
//             member.name = req.body.name;
//             member.age = req.body.age;
//             fs.writeFileSync('./db.json',JSON.stringify(members))
//             res.json(members)
//             return
//         }
//     }
//     res.json()
// });

app.delete('/member/:id', (req, res) => {
    let id = req.params.id
    members.data = members.data.filter(obj => obj.id != id);
    fs.writeFile('./db.json',JSON.stringify(members), (err, data) => {
        msg = err ? err.message : "Delete Success"
        res.redirect("/")
    });
})

parseDataJson = (path) => {
    data = fs.readFileSync(path, { encoding: "utf8" });
    members = JSON.parse(data)
}

app.listen(3100, function() {
    parseDataJson('./db.json');
});