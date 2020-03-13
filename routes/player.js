const express = require('express');
const path = require('path');
const fs = require('fs');

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
  const songPath = path.join(routerDir, 'music', `${songName}.flac`);
  audioPlayer = audio(songPath);
  
  res.redirect('/');
});

router.post('/stop', (req, res) => {
  if(audioPlayer && audioPlayer.running) killPlayer();
  res.redirect('/');
})


const killPlayer = () => {
  audioPlayer.quit();
  audioPlayer = null;
  songName = '';
}

router.get('/is-playing', (req, res) => {
  audioPlayer ? res.send({song: songName}) : res.send(false);
})

router.get('/', (req, res) => {
  res.sendFile(path.join(routerDir, 'views', 'index.html'))
});


module.exports = router;