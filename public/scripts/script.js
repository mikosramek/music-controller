let currentSong = '';

const playSong = function(songName) {
  $('#current').text(`Currently playing: ${songName}`);
  const base = window.location.origin;
  $.ajax(
    {
      url: `${base}/play-song`,
      method: 'POST',
      dataType: 'json',
      data: {"songName":songName}
    }
  );
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

    const song = $(this).text();
    currentSong = $(this);
    currentSong.css({background:'#c5efff'});
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