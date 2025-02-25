// hide interface //
let interfaceTimeout;
document.body.addEventListener('mousemove', function () {
	for (element of document.getElementsByClassName('interfaceItem')) {
		element.style.opacity = 1;
		document.body.style.cursor = 'initial';
	}

	clearTimeout(interfaceTimeout);

	interfaceTimeout = setTimeout(() => {
		for (element of document.getElementsByClassName('interfaceItem')) {
			element.style.opacity = 0;
			document.body.style.cursor = 'none';
		}
	}, 3000);

});
// //

// volume //
const volumeSlider = document.getElementById('volumeSlider');
volumeSlider.addEventListener('change', function () {
	mediaDisplay.volume = localStorage.volume = volumeSlider.value / 100;
});

volumeSlider.value = localStorage.volume * 100;
// //

// options //
let popoutButtonElement = document.getElementById('popoutButton');
popoutButtonElement.addEventListener('click', function () {
	window.open(window.location.href.split('?')[0], '', 'menubar=0');
});

let optionsElement = document.getElementById('options');
let optionsButtonElement = document.getElementById('optionsButton');
optionsButtonElement.addEventListener('click', function () {
	if (window.getComputedStyle(optionsElement).display === 'none') {
		optionsElement.style.display = 'block';
	}
	else {
		optionsElement.style.display = 'none'
	};
});

let qualitySelectElement = document.getElementById('qualitySelect');
qualitySelectElement.addEventListener('change', function () {
	let [width, height, frameRate] = qualitySelectElement.value.split('x');
	localStorage.width = width;
	localStorage.height = height;
	localStorage.frameRate = frameRate;

	mediaDisplay.srcObject.getVideoTracks()[0].applyConstraints({
		width: { exact: width },
		height: { exact: height },
		frameRate: { exact: frameRate }
	});
});

function getOptions(track) {
	const commonishResolutions = [
		{ width: 7680, height: 4320 },
		{ width: 3840, height: 2160 },
		{ width: 2560, height: 1440 },
		{ width: 1920, height: 1080 },
		{ width: 1400, height: 1050 },
		{ width: 1280, height: 1024 },
		{ width: 1280, height: 720 },
		{ width: 1152, height: 864 },
		{ width: 1024, height: 768 },
		{ width: 800, height: 600 },
		{ width: 640, height: 480 },
		{ width: 512, height: 448 },
		{ width: 320, height: 240 },
		{ width: 320, height: 224 },
		{ width: 256, height: 240 },
		{ width: 256, height: 224 }
	];

	const commonishFrameRates = [
		540,
		480,
		360,
		240,
		165,
		144,
		120,
		60,
		48,
		30,
		25,
		24
	];

	commonishResolutions.reverse().forEach(function (resolution) {
		commonishFrameRates.reverse().forEach(function (frameRate) {
			track.applyConstraints({
				width: { exact: resolution.width },
				height: { exact: resolution.height },
				frameRate: { exact: frameRate },
			})
				.then(() => {
					const option = document.createElement('option');
					option.value = option.text = `${resolution.width}x${resolution.height}x${frameRate}`;

					qualitySelectElement.appendChild(option);
				})
				.catch(() => { })
				.finally(() => {
					if (localStorage.width && localStorage.height && localStorage.frameRate) {
						qualitySelectElement.value = `${localStorage.width}x${localStorage.height}x${localStorage.frameRate}`;
					}

					track.applyConstraints({
						width: { ideal: localStorage.width },
						height: { ideal: localStorage.height },
						frameRate: { ideal: localStorage.frameRate },
					});
				});
		});
	});
}
// //

// media //
const mediaDisplay = document.getElementById('mediaDisplay');
if (navigator.mediaDevices.getUserMedia) {
	navigator.mediaDevices.getUserMedia({
		video: true,
		audio: true
	})
		.then(userMedia => {
			localStorage.videoDeviceId = userMedia.getVideoTracks()[0].getSettings().deviceId;
			localStorage.audioDeviceId = userMedia.getAudioTracks()[0].getSettings().deviceId;

			navigator.mediaDevices.getUserMedia({
				video: {
					deviceId: localStorage.videoDeviceId
				},
				audio: {
					deviceId: localStorage.audioDeviceId,
					echoCancellation: false
				}
			})
				.then(stream => {
					mediaDisplay.srcObject = stream;
					getOptions(stream.getVideoTracks()[0])
				})
				.catch(err => {
					console.log(err);
				});
		});
};
// //