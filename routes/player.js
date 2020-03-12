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

router.post('/play-song', (req, res) => {
  
  if(audioPlayer && audioPlayer.running) {
     killPlayer();
  }

  songName = req.body.songName;
  console.log(songName, 'song has been requested');
  const songPath = path.join(routerDir, 'music', `${req.body.songName}.flac`);

  console.log(toUnicode(songPath));

  audioPlayer = audio(songPath);
//if (fs.existsSync(songPath)) {
    //console.log('it exists');
    //audioPlayer = audio.play(songPath, (err) => {
      //if(err) throw err;
    //});
  //}
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