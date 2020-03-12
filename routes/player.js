const express = require('express');
const path = require('path');
const fs = require('fs');
const kill = require('tree-kill');

const spawn = require('child_process').spawn;

//const audio = require('play-sound')(opts = {});
const audio = require('node-omxplayer');
let audioPlayer = null;
let songName = '';

const routerDir = require('../util/path');

const router = express.Router();

//audioPlayer = audio('./music/In Love With A Ghost - healing - 01 introduction.flac');

console.log('왜 그래'.split(''));

const read = (path) => {
  fs.readdir(path, (err, files) => {
    console.log(files);
    files.forEach(file => {
      audioPlayer = audio(`./music/${file}`);
    })
  })
}

read('./music');


router.post('/play-song', (req, res) => {
  
  if(audioPlayer && audioPlayer.running) {
     killPlayer();
  }

  songName = req.body.songName;
  console.log(songName, 'has been requested');
  const songPath = path.join(routerDir, 'music', `${songName}.flac`);

  audioPlayer = audio(songPath);
  res.redirect('/');
});

function toUnicode(theString) {
  var unicodeString = '';
  for (var i=0; i < theString.length; i++) {
    var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
    while (theUnicode.length < 4) {
      theUnicode = '0' + theUnicode;
    }
    theUnicode = '\\u' + theUnicode;
    unicodeString += theUnicode;
  }
  return unicodeString;
}

router.post('/stop', (req, res) => {
  if(audioPlayer && audioPlayer.running) killPlayer();
  res.redirect('/');
})


const killPlayer = () => {
  console.log('Stopping song');
  //kill(audioPlayer.pid);
  audioPlayer.quit();
  songName = '';
}

router.get('/is-playing', (req, res) => {
  audioPlayer ? res.send({song: songName}) : res.send(false);
})

router.get('/', (req, res) => {
  res.sendFile(path.join(routerDir, 'views', 'index.html'))
});


module.exports = router;