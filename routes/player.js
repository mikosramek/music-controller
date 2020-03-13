const express = require('express');
const path = require('path');
const fs = require('fs');

const audio = require('node-omxplayer');
let audioPlayer = null;
let songName = '';


const queue = [];
let queueIndex = -1;

const songData = require('../util/getSongs');
const routerDir = require('../util/path');

const router = express.Router();

router.post('/play-song', (req, res) => {
  const {artist, album, track} = req.body;
  songName = track;
  playSong(artist, album, track);
  res.status(200).send('hi :)');
});

router.post('/play-album', (req, res) => {
  const { album : request } = req.body;
  createAlbumQueue(request);
});

router.post('/stop', (req, res) => {
  killPlayer();
  res.status(200).send('bye :(');
})

const createAlbumQueue = (request) => {
  queue.splice(0, queue.length);
  request.forEach(req => {
    queue.push(req);
  });
  console.log(queue);
  queueIndex = -1;
  playNextInQueue();
}

const playNextInQueue = () => {
  // kill audio player
  killPlayer();
  // move queue index by 1
  queueIndex++;
  // check to see if index is greater than current queue // return if it is
  if(queueIndex >= queue.length) return;
  const { artist, album, track } = queue[queueIndex];
  // playSong
  playSong(artist, album, track)
  // setup a trigger for when that current audioPlayer ends,
  audioPlayer.on('end', () => {
    playNextInQueue();
  });
  // call playNextInQueue
}


const playSong = (artist, album, track) => {
  const songPath = path.join(routerDir, 'music', artist, album, track);
  killPlayer();
  audioPlayer = audio(songPath);
  const info = audioPlayer.info();
  console.log(info);
}


const killPlayer = () => {
  if(audioPlayer && audioPlayer.running) {
    audioPlayer.quit();
    audioPlayer = null;
    songName = '';
  }
}

router.get('/is-playing', (req, res) => {
  audioPlayer ? res.send({ song: songName, player:audioPlayer.info() }) : res.send(false);
})


router.get('/', (req, res) => {
  res.render('index', {albums: songData});
});


module.exports = router;