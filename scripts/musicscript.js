var songIndex = 0;
var audioPlayer = document.getElementById('player');
var songList = document.getElementById('songList');
var playPauseButton = document.getElementById('playPauseButton');
var progressBar = document.getElementById('progressBar');
var timeDisplay = document.getElementById('timeDisplay');

audioPlayer.onended = function() {
   nextSong();
};

audioPlayer.ontimeupdate = function() {
   var progress = audioPlayer.currentTime / audioPlayer.duration * 100 + '%';
   progressBar.children[0].style.width = progress; 
   updateTimeDisplay();
};

function playPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.innerText = '⏸︎';
    } else {
        audioPlayer.pause();
        playPauseButton.innerText = '⏵︎';
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
    playPauseButton.innerText = '⏸︎';
    document.title = songs[songIndex].name; // Update the document title
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

function updateTimeDisplay() {
    var currentMinutes = Math.floor(audioPlayer.currentTime / 60);
    var currentSeconds = Math.floor(audioPlayer.currentTime % 60);
    var durationMinutes = Math.floor(audioPlayer.duration / 60);
    var durationSeconds = Math.floor(audioPlayer.duration % 60);

    if (currentSeconds < 10) currentSeconds = '0' + currentSeconds;
    if (durationSeconds < 10) durationSeconds = '0' + durationSeconds;

    timeDisplay.innerText = currentMinutes + ':' + currentSeconds + ' / ' + durationMinutes + ':' + durationSeconds;
}

updateSongList();
