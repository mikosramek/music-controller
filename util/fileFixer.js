const fs = require('fs');

const read = (path) => {
  fs.readdir(path, (err, files) => {
    files.forEach(file => {
      const flatName = [];
      for(let i = 0; i < file.length; i++){
        flatName.push(file[i]);
      }
      const s = flatName.join('');
      fs.rename(`${path}/${file}`, `${path}/${s.split('-').join('')}`, err => {
        console.log(err);
      });
    })
  })
}

module.exports = read;