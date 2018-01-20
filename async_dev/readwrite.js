const fs = require('fs');
const promisify = require('util').promisify;

let  readFileAsync = promisify(fs.readFile);
let  writeFileAsync = promisify(fs.writeFile);

async function copyFile(toCopy, newFileName) {
    try {
        let file = await readFileAsync(toCopy);
        await writeFileAsync(newFileName, file);
    } catch (e) {
        throw e;
    }
}

copyFile('readwrite2s.js', 'new_file')
    .then(() => {
        console.log('File is copied');
    })
    .catch(() => {
        console.log('Error while reading');
    });
