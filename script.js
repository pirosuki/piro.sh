if (window.location.protocol !== 'https:' && window.location.protocol !== 'file:') {
    //window.location.protocol = 'https:';
    console.log(window.location.protocol);
}

let deg = 0;
let fromg = document.getElementById('fromg');
let bonk = new Audio('./bonk.mp3');
fromg.addEventListener('click', function() {
    deg += 45;
    if (deg >= 360) {
        deg = 0;
    }
    
    fromg.style.transform = 'rotate(' + deg + 'deg)';
    bonk.play();
    bonk.currentTime = 0;

    cpsClick();

    console.log(cps);
});

let cps = 0;
let combo = 0;
let cpsCounter = document.getElementById('cpsCounter');
let comboCounter = document.getElementById('comboCounter');
async function cpsClick() {
    cps += 1;
    combo += 1;

    cpsCounter.textContent = cps;
    comboCounter.textContent = combo;

    await delay(1000);

    cps -= 1;
    if (cps === 0) {
        combo = 0;
    }

    cpsCounter.textContent = cps;
    comboCounter.textContent = combo;
};

const delay = ms => new Promise(res => setTimeout(res, ms));