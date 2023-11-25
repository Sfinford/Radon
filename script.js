document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audio-player');
    const currentTrackElement = document.getElementById('current-track');
    let audioFiles = [];
    let history = [];
    let maxHistoryLength = 0; // Variable to store the dynamic max history length

    document.getElementById('file-uploader').addEventListener('change', function(event) {
        audioFiles = event.target.files;
        updateMaxHistoryLength();
        playRandomAudioFile(); // Play the first file initially
    });

    document.getElementById('restart-button').addEventListener('click', function() {
        if (history.length > 1) {
            history.pop(); // Remove current song from history
            let previousIndex = history.pop(); // Get the previous song
            playAudioFile(previousIndex);
        }
    });

    document.getElementById('random-button').addEventListener('click', function() {
        if (audioFiles.length > 0) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * audioFiles.length);
            } while (history.includes(randomIndex));
            playAudioFile(randomIndex);
        }
    });

    function playAudioFile(index) {
        let file = audioFiles[index];
        audioPlayer.src = URL.createObjectURL(file);
        updateCurrentTrackDisplay(file.name);
        audioPlayer.play();
        addToHistory(index);
    }

    function addToHistory(index) {
        history.push(index);
        if (history.length > maxHistoryLength) {
            history.shift();
        }
    }

    function updateCurrentTrackDisplay(fileName) {
    const maxDisplayLength = 25; // Set your desired max length here
    const displayName = fileName.replace(/\.[^/.]+$/, ""); // Removing the file extension

    // Truncate and append ellipsis if necessary
    let displayText = displayName.length > maxDisplayLength
        ? displayName.substring(0, maxDisplayLength) + "..."
        : displayName;

    currentTrackElement.textContent = displayText;
}

    function updateMaxHistoryLength() {
        maxHistoryLength = Math.floor(audioFiles.length * 0.8); // 20% reduction with ceiling
    }

function playRandomAudioFile() {
        if (audioFiles.length > 0) {
            let randomIndex = Math.floor(Math.random() * audioFiles.length);
            playAudioFile(randomIndex);
        }
    }
});
