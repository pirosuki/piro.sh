let lopez = document.getElementById('lopez');
let fish = new Audio('./fish.mp3');
lopez.addEventListener('click', function() {
    fish.play();
    fish.currentTime = 0;
});