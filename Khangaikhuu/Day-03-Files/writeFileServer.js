const fs = require('fs');

const change = {
    name: "test",
    gender: "female",
    interest: "nobody"
}

fs.writeFile('./data/test.json', JSON.stringify(change), err => {
    if (err) {
        console.error(err);
    } else {
        console.log('success');
    }
})