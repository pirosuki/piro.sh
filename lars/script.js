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

// Variables for preferred devices
let preferredVideo;
let preferredAudio;

// Get preferred devices
navigator.mediaDevices.enumerateDevices()
.then(devices => { devices.forEach(device => {
		if (device.label.includes('Game Capture')) {
			if (device.kind === 'videoinput') {
				preferredVideo = device;

				console.log("video: ", device.label);
			}
			else if (device.kind === 'audioinput') {
				preferredAudio = device;

				console.log("audio: ", device.label);
			};
		};
	})

	// Get webcam
	if (navigator.mediaDevices.getUserMedia) {
		navigator.mediaDevices.getUserMedia({ video: { deviceId: preferredVideo.deviceId}, audio: { deviceId: preferredAudio.deviceId, echoCancellation: false}})
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

