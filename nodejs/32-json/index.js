const fs = require("fs");

try {
    let content = fs.readFileSync('./data.json', { encoding: "utf8" })
    let profile = JSON.parse(content)
    console.log(profile.name);
    let members = ["25", "male"]
    profile.moreInfo = members
    fs.writeFileSync("./data.json", JSON.stringify(profile))
} catch (error) {
    console.log(error);
}