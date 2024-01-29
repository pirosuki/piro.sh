// Grab popout parameter
const urlParams = new URLSearchParams(window.location.search);
const popout = urlParams.get('popout');

// If it isnt either true or false then open a popout window with it set to true
if (popout === 'true') {
	window.open(window.location.href.split('?')[0], '', 'menubar=0');
	window.close();
};

// Get mediaSource
const mediaDisplay = document.getElementById('mediaDisplay');

// Get preferred devices
navigator.mediaDevices.enumerateDevices()
.then(devices => { 
	// Variables for preferred devices
	let preferredVideoId;
	let preferredAudioId;

	devices.forEach(device => {
		if (device.label.includes('Game Capture')) {
			if (device.kind === 'videoinput') {
				preferredVideoId = device.deviceId;

				console.log("video: ", device.label);
			}
			else if (device.kind === 'audioinput') {
				preferredAudioId = device.deviceId;

				console.log("audio: ", device.label);
			};
		}
	})
	
	getMediaStream(preferredVideoId, preferredAudioId)
})

// Get webcam
function getMediaStream(preferredVideoId, preferredAudioId) {
	if (navigator.mediaDevices.getUserMedia) {
		navigator.mediaDevices.getUserMedia({ video: { deviceId: preferredVideoId}, audio: { deviceId: preferredAudioId, echoCancellation: false}})
		.then(stream => {
			console.log(stream)
			mediaDisplay.srcObject = stream;
		})
		.catch(err => {
			console.log("Brokie!");
			console.log(err);
		});
	};
}

// volumeSlider logic
const volumeSlider = document.getElementById('volumeSlider');
volumeSlider.addEventListener('change', function(e) {
	mediaDisplay.volume = e.currentTarget.value / 100;
});

// Hide interface after no movement

let interfaceTimeout;
const interfaceItem = document.getElementsByClassName('interfaceItem')[0];
mediaDisplay.addEventListener('mousemove', function() {
	interfaceItem.style.opacity = 1;
	document.body.style.cursor = 'initial';

	clearTimeout(interfaceTimeout);

	interfaceTimeout = setTimeout(() => {
		interfaceItem.style.opacity = 0;
		document.body.style.cursor = 'none';
	}, 1000);
});

