        let currentSongIndex = 0;
        let audio = new Audio(songs[currentSongIndex].file);
        const playPauseButton = document.getElementById('play-pause');
        const timeDisplay = document.getElementById('time-display');
        const progressBar = document.getElementById('progress');
        const scrubBar = document.getElementById('scrub-bar');
        const trackList = document.getElementById('track-list');

        function updateTrackList() {
            trackList.innerHTML = songs.map((song, index) => 
                `<div class="${index === currentSongIndex ? 'active' : ''}">${song.name}</div>`
            ).join('');
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

        function updateTimeDisplay() {
            const currentTime = Math.floor(audio.currentTime);
            const duration = Math.floor(audio.duration);
            timeDisplay.textContent = `${Math.floor(currentTime / 60)}:${String(currentTime % 60).padStart(2, '0')} / ${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}`;
            progressBar.style.width = `${(currentTime / duration) * 100}%`;
        }

        function playPause() {
            if (audio.paused) {
                audio.play();
                playPauseButton.textContent = 'PAUSE';
            } else {
                audio.pause();
                playPauseButton.textContent = 'PLAY';
            }
        }

        function nextSong() {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            loadSong();
        }

        function prevSong() {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            loadSong();
        }

        function loadSong() {
            audio.src = songs[currentSongIndex].file;
            audio.play();
            playPauseButton.textContent = 'PAUSE';
            updateTrackList();
            updateMediaSession();
        }

        audio.addEventListener('ended', nextSong);
        audio.addEventListener('timeupdate', updateTimeDisplay);
        playPauseButton.addEventListener('click', playPause);
        document.getElementById('next').addEventListener('click', nextSong);
        document.getElementById('prev').addEventListener('click', prevSong);
        scrubBar.addEventListener('click', (e) => {
            const scrubberWidth = scrubBar.clientWidth;
            const clickX = e.offsetX;
            const newTime = (clickX / scrubberWidth) * audio.duration;
            audio.currentTime = newTime;
        });

        updateTrackList();
        updateMediaSession();
