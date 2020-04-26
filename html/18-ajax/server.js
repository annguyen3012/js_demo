const express = require('express');
const app = express();
var cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

members = [];
app.get('/', (req, res) => {
    res.json(members);
});

app.post('/member', (req, res) => {
    member = {
        id: 1,
        name: req.body.name,
        age: req.body.age
    }
    if (members.members) {
        length = members.members.length;
        member.id = members.members[length - 1].id + 1;
        console.log(member);
        members.members.push(member)        
    } else {
        members.members = member  
    }
    fs.writeFileSync('./db.json',JSON.stringify(members))
    res.json(members);    
});

app.get('/member/:id/edit', (req, res) => {
    let id = req.params.id
    member = members.members.find(m => m.id == id);
    if (member) {
        res.json(member);           
    } else {
        res.json() 
    }
});

app.put('/member/:id/update', (req, res) => {
    let id = req.params.id
    for (member of members.members) {
        if (member.id == id) {
            member.name = req.body.name;
            member.age = req.body.age;
            fs.writeFileSync('./db.json',JSON.stringify(members))
            res.json(members)
            return
        }
    }
    res.json()
});

app.delete('/member/:id', (req, res) => {
    let id = req.params.id
    members.members = members.members.filter(obj => obj.id != id);
    fs.writeFile('./db.json',JSON.stringify(members), (err, data) => {
        msg = err ? err.message : "Delete Success"
        res.json({message: msg})
    });
})

parseDataJson = (path) => {
    data = fs.readFileSync(path, { encoding: "utf8" });
    members = JSON.parse(data)
}

validate = (param) => {

}
app.listen(3100, function() {
    parseDataJson('./db.json');
});