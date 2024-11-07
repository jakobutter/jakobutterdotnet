<script>
var songIndex = -1;
var audioPlayer = document.getElementById('player');
var songList = document.getElementById('songList');
var playPauseButton = document.getElementById('playPauseButton');
var progressBar = document.getElementById('progressBar');
var timeDisplay = document.getElementById('timeDisplay');

window.onload = function() {
    loadSong(0);
};

audioPlayer.onended = nextSong;
audioPlayer.ontimeupdate = updateProgress;

function loadSong(index) {
    songIndex = index;
    audioPlayer.src = songs[songIndex].file;
    updateSongList();
    updateMediaSession();
    playSong();
}

function playPause() {
    audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
    playPauseButton.innerText = audioPlayer.paused ? '⏵︎' : '⏸︎';
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
}

function updateProgress() {
    var progress = (audioPlayer.currentTime / audioPlayer.duration) * 100 + '%';
    progressBar.children[0].style.width = progress;
    updateTimeDisplay();
}

function updateTimeDisplay() {
    var currentMinutes = Math.floor(audioPlayer.currentTime / 60);
    var currentSeconds = Math.floor(audioPlayer.currentTime % 60);
    var durationMinutes = Math.floor(audioPlayer.duration / 60);
    var durationSeconds = Math.floor(audioPlayer.duration % 60);
    timeDisplay.innerText = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds} / ${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
}

function updateSongList() {
    songList.innerHTML = songs.map((song, index) => 
        `<div class="song${index === songIndex ? ' playing' : ''}" onclick="loadSong(${index})">${song.name}</div>`
    ).join('');
}

function updateMediaSession() {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: songs[songIndex].name,
            artist: songs[songIndex].artist || 'Unknown Artist',
            album: songs[songIndex].album || 'Unknown Album',
            artwork: [{ src: 'artwork.jpg', sizes: '512x512', type: 'image/jpeg' }]
        });
    }
}

updateSongList();
</script>
