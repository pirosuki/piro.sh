// Grab popout parameter
const urlParams = new URLSearchParams(window.location.search);
const popout = urlParams.get('popout');

// If it isnt either true or false then open a popout window with it set to true
if (popout != 'true' && popout != 'false') {
	window.open(window.location.href+'?popout=true', '', 'menubar=0');
	window.close();
};

// Get mediaSource
const mediaSource = document.getElementById('mediaSource');

// Get preferred devices
let preferredVideoId;
let preferredAudioId;
navigator.mediaDevices.enumerateDevices()
.then(devices => { devices.forEach(device => {
	// Variables for preferred devices
		if (device.label.includes('Game Capture')) {
			if (device.kind === 'videoinput') {
				preferredVideo = device.deviceId;

				console.log("video: ", device.label);
			}
			else if (device.kind === 'audioinput') {
				preferredAudio = device.deviceId;

				console.log("audio: ", device.label);
			};
		};
	})

	// Get webcam
	if (navigator.mediaDevices.getUserMedia) {
		navigator.mediaDevices.getUserMedia({ video: { deviceId: preferredVideoId}, audio: { deviceId: preferredAudioId, echoCancellation: false}})
		.then(stream => {
			console.log(stream)
			mediaSource.srcObject = stream;
		})
		.catch(err => {
			console.log("Brokie!");
			console.log(err);
		});
	};
});

