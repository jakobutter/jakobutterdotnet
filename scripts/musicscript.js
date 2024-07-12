document.addEventListener('DOMContentLoaded', function() {
    var songDataElement = document.getElementById('songData');
    var songs = JSON.parse(songDataElement.getAttribute('data-songs'));

    var songIndex = 0;
    var audioPlayer = document.getElementById('player');
    var songList = document.getElementById('songList');
    var playPauseButton = document.getElementById('playPauseButton');
    var progressBar = document.getElementById('progressBar');
    var currentTimeElement = document.getElementById('currentTime');
    var durationElement = document.getElementById('duration');

    audioPlayer.onended = function() {
        nextSong();
    };

    audioPlayer.ontimeupdate = function() {
        var progress = audioPlayer.currentTime / audioPlayer.duration * 100 + '%';
        progressBar.children[0].style.width = progress; 
        currentTimeElement.innerText = formatTime(audioPlayer.currentTime);
    };

    audioPlayer.onloadedmetadata = function() {
        durationElement.innerText = formatTime(audioPlayer.duration);
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

    function formatTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        var seconds = Math.floor(seconds % 60);
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }

    updateSongList();
});
