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

const bindSongs = function() {
  $('.album li').on('click', function() {

    if(currentSong) currentSong.css({background:'none'});

    const song = $(this).data();
    currentSong = $(this);
    currentSong.css({background:'#c5efff'});
    console.log(song);
    playSong(song);
  });
  $('#stop').on('click', function() {
    stopSong();
  })
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
      $('#current').text(`Currently playing: ${data.song}`);
    }
  } );
}

// $(function() {
$(document).ready(function(){
  checkIfPlaying();
  bindSongs();
});