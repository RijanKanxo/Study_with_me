var audioElements = document.querySelectorAll('audio');
var playPauseButton = document.getElementById('playPauseButton');
var musicPlayerContainer = document.getElementById('musicPlayerContainer');
var timer1 = document.getElementById('timer1');
var volumeSliders = document.querySelectorAll('.volume-slider');
var editButton = document.querySelectorAll('editButton');



function togglePlayPause() {
    if (audioElements[0].paused) {
        for (var i = 0; i < audioElements.length; i++) {
            audioElements[i].play();
        }
        playPauseButton.innerHTML = "&#9616;&#9616;"; // Change button to pause icon
    } else {
        for (var i = 0; i < audioElements.length; i++) {
            audioElements[i].pause();
        }
        playPauseButton.innerHTML = "&#9654;"; // Change button to play icon
    }
}

audioElements.forEach(function (audio) {
audio.volume = 0;
});


function setVolume(id, volume) {
    var audio = document.getElementById(id);
    audio.volume = volume;
}

function togglePlayerVisibility() {
    if (musicPlayerContainer.style.display === 'none'|| !musicPlayerContainer.style.display) {
        musicPlayerContainer.style.display = 'block';
    } else {
        musicPlayerContainer.style.display = 'none';
    }
}

function timer1visibility() {
    if (timer1.style.display === 'block') {
        timer1.style.display = 'none';
    } else {
        timer1.style.display = 'block';
    }
}


function editButtonvisibility() {
    var focusSettings = document.getElementById('focus-settings');
    var breakSettings = document.getElementById('break-settings');

    if (focusSettings.style.display === 'block') {
        focusSettings.style.display = 'none';
        breakSettings.style.display = 'none';
    } else {
        focusSettings.style.display = 'block';
        breakSettings.style.display = 'block';
    }
}



document.addEventListener("DOMContentLoaded", function() {
var video = document.querySelector("iframe");
video.requestFullscreen = video.requestFullscreen || video.mozRequestFullScreen || video.webkitRequestFullscreen || video.msRequestFullscreen;

if (video.requestFullscreen) {
video.requestFullscreen();
}
});


const focusDurationInput = document.getElementById('focus-duration');
const breakDurationInput = document.getElementById('break-duration');
const timerLabel = document.getElementById('timer-label');
const timeLeft = document.getElementById('time-left');
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
let isRunning = false;
let focusDuration = parseInt(focusDurationInput.value);
let breakDuration = parseInt(breakDurationInput.value);
let totalTime = focusDuration * 60;
let timerInterval;

function updateTimer() {
const minutes = Math.floor(totalTime / 60).toString().padStart(2, '0');
const seconds = (totalTime % 60).toString().padStart(2, '0');
timeLeft.textContent = `${minutes}:${seconds}`;
}

function toggleTimer() {
if (isRunning) {
clearInterval(timerInterval);
isRunning = false;
startStopButton.textContent = 'Start';
} else {
timerInterval = setInterval(() => {
totalTime--;
updateTimer();
if (totalTime === 0) {
playAlarmSound(); // Play an alarm sound when the timer reaches 0
if (timerLabel.textContent === 'Focus') {
  timerLabel.textContent = 'Break';
  totalTime = breakDuration * 60;
} else {
  timerLabel.textContent = 'Focus';
  totalTime = focusDuration * 60;
}
}
}, 1000);
isRunning = true;
startStopButton.textContent = 'Stop';
}
}

function resetTimer() {
clearInterval(timerInterval);
isRunning = false;
startStopButton.textContent = 'Start';
timerLabel.textContent = 'Focus';
focusDuration = parseInt(focusDurationInput.value);
breakDuration = parseInt(breakDurationInput.value);
totalTime = focusDuration * 60;
updateTimer();
}


startStopButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
updateTimer();

// Function to extract the video ID from a YouTube link
function extractVideoId(link) {
    // Use a regular expression to extract the video ID
    const regex = /[?&]v=([^&]+)/;
    const match = link.match(regex);
    if (match && match[1]) {
        return match[1];
    } else {
        return null;
    }
}

// Function to embed and play the YouTube video
function embedAndPlayVideo(videoId) {
    const embeddedVideo = document.getElementById('embeddedVideo');
    if (videoId) {
        // Create the embed code with the extracted video ID
        const embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1" frameborder="0" allowfullscreen></iframe>`;
        embeddedVideo.innerHTML = embedCode;
    } else {
        embeddedVideo.innerHTML = 'Invalid YouTube link.';
    }
}

// Handle the form submission
const videoForm = document.getElementById('videoForm');
videoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const youtubeLinkInput = document.getElementById('youtubeLink');
    const youtubeLink = youtubeLinkInput.value.trim();

    // Extract the video ID from the link
    const videoId = extractVideoId(youtubeLink);

    // Embed and play the video
    embedAndPlayVideo(videoId);
});
