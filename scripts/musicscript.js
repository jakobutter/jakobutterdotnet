document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const songList = document.getElementById('songList');

    songList.addEventListener('click', function(e) {
        if (e.target && e.target.nodeName === 'LI') {
            const songSrc = e.target.getAttribute('data-src');
            audioPlayer.src = songSrc;
            audioPlayer.play();
        }
    });
});
