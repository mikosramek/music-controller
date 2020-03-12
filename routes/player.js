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

  //const songPath = path.join(routerDir, 'music', `${songName}.flac`);

  fs.readdir('./music', (err, files) => {
    files.forEach(file => {
      const fileParts = file.split('-');
 
      const target = `${songName}.flac`;
      const targetParts = target.split('-');
      
      // Check band Name
      if(targetParts[0] === fileParts[0]){
	// Check album name
        if(targetParts[1] === fileParts[1]){
	  // Check track number
	  

          const tTrack = targetParts[2].split('')[1] + targetParts[2].split('')[2];
          const fTrack = fileParts[2].split('')[1] + fileParts[2].split('')[2];

          if(tTrack === fTrack){
            if(audioPlayer && audioPlayer.running) { return; }
            audioPlayer = audio(`./music/${file}`);
          } 
        }
      }     
    })
  })
  res.redirect('/');
});

router.post('/stop', (req, res) => {
  if(audioPlayer && audioPlayer.running) killPlayer();
  res.redirect('/');
})


const killPlayer = () => {
  console.log('Stopping song');
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