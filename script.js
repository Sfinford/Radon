document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audio-player');
    const currentTrackElement = document.getElementById('current-track');
    let audioFiles = [];
    let currentPlaying = null;

    document.getElementById('file-uploader').addEventListener('change', function(event) {
        audioFiles = event.target.files;
        playAudioFile(0); // Play the first file initially
    });

    document.getElementById('restart-button').addEventListener('click', function() {
        if (currentPlaying !== null) {
            audioPlayer.currentTime = 0;
            audioPlayer.play();
        }
    });

    document.getElementById('random-button').addEventListener('click', function() {
        if (audioFiles.length > 0) {
            let randomIndex = Math.floor(Math.random() * audioFiles.length);
            playAudioFile(randomIndex);
        }
    });

    function playAudioFile(index) {
        currentPlaying = index;
        let file = audioFiles[index];
        audioPlayer.src = URL.createObjectURL(file);
        updateCurrentTrackDisplay(file.name); // Update the display
        audioPlayer.play();
    }

function updateCurrentTrackDisplay(fileName) {
        // Remove the file extension and update the display
        const displayName = fileName.replace(/\.[^/.]+$/, "");
        currentTrackElement.textContent = `${displayName}`;
    }
});
