        const audio = document.getElementById('audio');
        const playPauseButton = document.getElementById('playPause');
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');
        const progressBar = document.getElementById('progress').firstElementChild;
        const timeDisplay = document.getElementById('time');
        const playlistItems = document.querySelectorAll('#playlist li');
        let currentSongIndex = 0;

navigator.mediaSession.setActionHandler("play", () => {
    /* Code excerpted. */
  });
  navigator.mediaSession.setActionHandler("pause", () => {
    /* Code excerpted. */
  });
  navigator.mediaSession.setActionHandler("stop", () => {
    /* Code excerpted. */
  });
  navigator.mediaSession.setActionHandler("seekbackward", () => {
    /* Code excerpted. */
  });
  navigator.mediaSession.setActionHandler("seekforward", () => {
    /* Code excerpted. */
  });
  navigator.mediaSession.setActionHandler("seekto", () => {
    /* Code excerpted. */
  });
  navigator.mediaSession.setActionHandler("previoustrack", () => {
    /* Code excerpted. */
  });
  navigator.mediaSession.setActionHandler("nexttrack", () => {
    /* Code excerpted. */
  });
  navigator.mediaSession.setActionHandler("skipad", () => {
    /* Code excerpted. */
  });

        audio.addEventListener('loadedmetadata', () => {
            updateProgress();
        });

        audio.addEventListener('timeupdate', () => {
            updateProgress();
        });

        playPauseButton.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playPauseButton.textContent = '⏸︎';
            } else {
                audio.pause();
                playPauseButton.textContent = '▶';
            }
        });

        prevButton.addEventListener('click', () => {
            currentSongIndex = (currentSongIndex - 1 + playlistItems.length) % playlistItems.length;
            loadSong();
        });

        nextButton.addEventListener('click', () => {
            currentSongIndex = (currentSongIndex + 1) % playlistItems.length;
            loadSong();
        });

        function loadSong() {
            audio.src = playlistItems[currentSongIndex].textContent.toLowerCase().replace(' ', '') + '.mp3';
            audio.play();
            playPauseButton.textContent = '⏸︎';
            highlightCurrentSong();
        }

        function highlightCurrentSong() {
            playlistItems.forEach((item, index) => {
                item.classList.toggle('active', index === currentSongIndex);
            });
        }

        function updateProgress() {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = progress + '%';
            timeDisplay.textContent = formatTime(audio.currentTime) + ' / ' + formatTime(audio.duration);
        }

        function setProgress(event) {
            const totalWidth = event.currentTarget.clientWidth;
            const clickX = event.offsetX;
            const newTime = (clickX / totalWidth) * audio.duration;
            audio.currentTime = newTime;
        }

        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        }
