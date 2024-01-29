// Grab popout parameter
const urlParams = new URLSearchParams(window.location.search);
const popout = urlParams.get('popout');

// If it isnt either true or false then open a popout window with it set to true
if (popout === 'do') {
	window.open(window.location.href, '', 'menubar=0');
	window.close();
};

// Get mediaSource
const mediaSource = document.getElementById('mediaSource');

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
			mediaSource.srcObject = stream;
		})
		.catch(err => {
			console.log("Brokie!");
			console.log(err);
		});
	};
}