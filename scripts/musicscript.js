        let currentSongIndex = 0;
        let audio = new Audio(songs[currentSongIndex].file);
        let isPlaying = false;

        const playPauseButton = document.getElementById('play-pause');
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');
        const timeDisplay = document.getElementById('time-display');
        const progressBar = document.getElementById('progress');
        const scrubBar = document.getElementById('scrub-bar');
        const trackList = document.getElementById('track-list');

        function updateTrackList() {
            trackList.innerHTML = songs.map((song, index) => 
                `<div class="${index === currentSongIndex ? 'active' : ''}">${song.name}</div>`
            ).join('');
        }

        function updateTimeDisplay() {
            const currentTime = Math.floor(audio.currentTime);
            const duration = Math.floor(audio.duration);
            timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
            progressBar.style.width = `${(currentTime / duration) * 100}%`;
        }

        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        }

        function playSong() {
            audio.play();
            isPlaying = true;
            playPauseButton.textContent = "⏸︎";
            updateMediaSession();
        }

        function pauseSong() {
            audio.pause();
            isPlaying = false;
            playPauseButton.textContent = "▶";
        }

        function updateMediaSession() {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: songs[songIndex].name,
            artist: songs[songIndex].artist || 'Yung Ulcer',
            album: songs[songIndex].album || 'Unknown Album',
            artwork: [
                { src: pageArtwork.src, sizes: '512x512', type: 'image/jpeg' }
            ]
        });
        navigator.mediaSession.setActionHandler('play', playPause);
        navigator.mediaSession.setActionHandler('pause', playPause);
        navigator.mediaSession.setActionHandler('previoustrack', prevSong);
        navigator.mediaSession.setActionHandler('nexttrack', nextSong);
    }
}

        playPauseButton.addEventListener('click', () => {
            isPlaying ? pauseSong() : playSong();
        });

        prevButton.addEventListener('click', () => {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            audio.src = songs[currentSongIndex].file;
            updateTrackList();
            playSong();
        });

        nextButton.addEventListener('click', () => {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            audio.src = songs[currentSongIndex].file;
            updateTrackList();
            playSong();
        });

        scrubBar.addEventListener('click', (event) => {
            const scrubberWidth = scrubBar.clientWidth;
            const clickPosition = event.offsetX;
            const newTime = (clickPosition / scrubberWidth) * audio.duration;
            audio.currentTime = newTime;
        });

        audio.addEventListener('timeupdate', updateTimeDisplay);
        audio.addEventListener('ended', nextButton.click);
        
        updateTrackList();
