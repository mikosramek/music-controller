let currentSong = '';

const playSong = function(song) {
  $('#current').text(`Currently playing: ${song.track} by ${song.artist}`);
  const base = window.location.origin;
  $.ajax(
    {
      url: `${base}/play-song`,
      method: 'POST',
      dataType: 'json',
      data: {
        "artist": song.artist,
        "album": song.album,
        "track":song.track,
      }
    }
  ).then(data => {
    console.log(data);
  });
}

const stopSong = function() {
  $('#current').text(`Currently playing: nothing`);
  if(currentSong) currentSong.css({background:'none'});
  const base = window.location.origin;
  $.ajax(
    {
      url: `${base}/stop`,
      method: 'POST',
      dataType: 'json',
    }
  );
}

const playAlbum = function(album) {
  $('#current').text(`Currently playing: ${album[0].track} by ${album[0].artist}`);
  const base = window.location.origin;
  $.ajax(
    {
      url: `${base}/play-album`,
      method: 'POST',
      dataType: 'json',
      data: {
        "album":album
      }
    }
  ).then(data => {
    console.log(data);
  });
}

const bindSongs = function() {
  $('.album li').on('click', function() {
    if(currentSong) currentSong.css({background:'none'});
    const song = $(this).data();
    currentSong = $(this);
    currentSong.css({background:'#c5efff'});
    playSong(song);
  });
  $('#stop').on('click', function() {
    stopSong();
  })
  $('.album-data button').on('click', function() {
    const tracks = $(this).siblings('ul').children('li');
    const albumData = [];
    for(let i = 0; i < tracks.length; i++){
      albumData.push($(tracks[i]).data());
    }
    playAlbum(albumData);
  });
}

const checkIfPlaying = function() {
  const base = window.location.origin;
  $.ajax(
    {
      url: `${base}/is-playing`,
      method: 'GET',
      dataType: 'json'
    }
  ).then( data => {
    if(data) {
      $('#current').text(`Currently playing: ${data.song.replace('.flac', '')}`);
    }
  } );
}

// $(function() {
$(document).ready(function(){
  checkIfPlaying();
  bindSongs();
});