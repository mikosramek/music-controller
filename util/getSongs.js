'use strict'

const fs = require('fs');

const songsData = [];

const getFiles = (folderPath) => {
  return new Promise((res, rej) => {
    fs.readdir(folderPath, (err, files) => {
      if(err) rej(err);
      res(files);
    })
  })
}


const init = async () => {
  const artistFolders = await getFiles('./music');
  for(let i = 0; i < artistFolders.length; i++){
    const artist = artistFolders[i]
    if(artist !== '.DS_Store'){
      const albumFolders = await getFiles(`./music/${artist}`);
      for(let n = 0; n < albumFolders.length; n++){
        const album = albumFolders[n];
        if(album !== '.DS_Store'){
          const songs = await getFiles(`./music/${artist}/${album}`);
          const tracks = [];
          for(let x = 0; x < songs.length; x++){
            const song = songs[x];
            if(song !== 'cover.jpg'){
              tracks.push(song);
            }
          }
          const newSongData = {
            artist: artist,
            album: album,
            tracks: tracks,
          }
          songsData.push(newSongData);
        }
      }
    }
  }
}

init();

module.exports = songsData;