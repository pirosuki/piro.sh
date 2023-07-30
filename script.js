if (window.location.protocol !== 'https:' && window.location.protocol !== 'file:') {
    window.location.protocol = 'https:';
}

let deg = 0;
let fromg = document.getElementById('fromg');
let bonk = new Audio('./bonk.mp3');
const AudioContext = window.AudioContext || window.webkitAudioContext; // https://stackoverflow.com/a/54119854
const audioCtx = new AudioContext();
fromg.addEventListener('click', function() {
    deg += 45;
    if (deg >= 360) {
        deg = 0;
    }
    
    fromg.style.transform = 'rotate(' + deg + 'deg)';
    bonk.currentTime = 0;
    bonk.play();
})
