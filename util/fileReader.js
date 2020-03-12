const fs = require('fs');

const read = (path) => {
  fs.readdir(path, (err, files) => {
    console.log(files);
    files.forEach(file => {

      console.log(`<li>${file.replace('.flac', '')}</li>`)
    })
  })
}

module.exports = read;