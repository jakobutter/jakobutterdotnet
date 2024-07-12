var songs = [
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Skye", file: "https://www.jakobutter.net/arkive/ourworlds/02skye.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
  {name: "Willow", file: "https://www.jakobutter.net/arkive/ourworlds/01willow.mp3"},
];
var songIndex = 0;
var audioPlayer = document.getElementById('player');
var songList = document.getElementById('songList');
var playPauseButton = document.getElementById('playPauseButton');
var progressBar = document.getElementById('progressBar');

audioPlayer.onended = function() {
   nextSong();
};

audioPlayer.ontimeupdate = function() {
   var progress = audioPlayer.currentTime / audioPlayer.duration * 100 + '%';
   progressBar.children[0].style.width = progress; 
};

function playPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.innerText = 'I I';
    } else {
        audioPlayer.pause();
        playPauseButton.innerText = '>';
    }
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    playSong();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    playSong();
}

function playSong() {
    audioPlayer.src = songs[songIndex].file;
    audioPlayer.play();
    playPauseButton.innerText = 'I I';
    updateSongList();
}

function updateSongList() {
   songList.innerHTML = songs.map(function(song, index) {
       return '<div class="song' + (index === songIndex ? ' playing' : '') + '" onclick="selectSong(' + index + ')">' + song.name + '</div>';
   }).join('');
}

function selectSong(index) {
   songIndex = index;
   playSong();
}

function scrub(event) {
   var x = event.offsetX / progressBar.offsetWidth * audioPlayer.duration; 
   audioPlayer.currentTime = x; 
}

updateSongList();
