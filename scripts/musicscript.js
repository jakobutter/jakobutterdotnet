// Define the songs array
var songs = [
    { name: 'back to the sticks', file: 'https://www.jakobutter.net/arkive/backtothesticks.mp3', artist: 'Yung Ulcer', album: 'back to the sticks' }
];

var currentSongIndex = 0;
var audioPlayer = document.getElementById('player');
var playPauseButton = document.getElementById('playPauseButton');
var progressBar = document.getElementById('progressBar').firstElementChild;
var timeDisplay = document.getElementById('timeDisplay');

// Load the current song
function loadSong(index) {
    audioPlayer.src = songs[index].file;
    audioPlayer.load();
    updateMediaSession();
}


function playPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.textContent = '❚❚'; // Change button to pause icon
    } else {
        audioPlayer.pause();
        playPauseButton.textContent = '▶'; // Change button to play icon
    }
}

// Update the Media Session metadata
function updateMediaSession() {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: songs[currentSongIndex].name,
            artist: songs[currentSongIndex].artist,
            album: songs[currentSongIndex].album,
            artwork: [
                { src: 'path/to/artwork.jpg', sizes: '96x96', type: 'image/jpg' }
            ]
        });
    }
}

// Scrub through the audio
function scrub(event) {
    const scrubTime = (event.offsetX / progressBar.parentElement.offsetWidth) * audioPlayer.duration;
    audioPlayer.currentTime = scrubTime;
}

// Update progress bar and time display
audioPlayer.addEventListener('timeupdate', () => {
    const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = progressPercent + '%';
    timeDisplay.textContent = formatTime(audioPlayer.currentTime) + ' / ' + formatTime(audioPlayer.duration);
});

// Format time in minutes and seconds
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Previous and Next song functionality
function previousSong() {
    currentSongIndex = (currentSongIndex > 0) ? currentSongIndex - 1 : songs.length - 1;
    loadSong(currentSongIndex);
    playPause();
}

function nextSong() {
    currentSongIndex = (currentSongIndex < songs.length - 1) ? currentSongIndex + 1 : 0;
    loadSong(currentSongIndex);
    playPause();
}

// Initialize the player
loadSong(currentSongIndex);
