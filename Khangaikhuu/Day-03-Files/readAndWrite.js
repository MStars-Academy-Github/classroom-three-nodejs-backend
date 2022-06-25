const fs = require('fs');

fs.readFile('./data/test.json', 'utf-8', (err, data) => {
    if(err) {
        console.error(err);
    } else {
        console.log(data);
        fs.writeFile('./data/write.json', data, err => {
            if(err) {
                console.log(err);
            } else {
                console.log('success');
            }
        });
    }
})