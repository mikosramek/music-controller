const express = require('express');
const path = require('path');
const fs = require('fs');

const audio = require('node-omxplayer');
let audioPlayer = null;
let songName = '';


const songData = require('../util/getSongs');
const routerDir = require('../util/path');

const router = express.Router();

router.post('/play-song', (req, res) => {
  
  if(audioPlayer && audioPlayer.running) {
     killPlayer();
  }

  const {artist, album, track} = req.body;
  const songPath = path.join(routerDir, 'music', artist, album, track);
  audioPlayer = audio(songPath);
  
  res.status(200).send(audioPlayer.info());
});

router.post('/stop', (req, res) => {
  if(audioPlayer && audioPlayer.running) killPlayer();
  res.status(200).send();
})


const killPlayer = () => {
  audioPlayer.quit();
  audioPlayer = null;
  songName = '';
}

router.get('/is-playing', (req, res) => {
  audioPlayer ? res.send({ song: songName, player:audioPlayer.info() }) : res.send(false);
})


router.get('/', (req, res) => {
  res.render('index', {albums: songData});
});


module.exports = router;