//This file acts as the frontend code
//It has access to everything within the broswer


//Buttons
const video = document.querySelector('video');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const videoSelect = document.getElementById('videoSelect');
videoSelect.onclick = getScreens;


//Electron Desktop Capture (Screen Record) Module
const { desktopCapturer, remote } = require('electron');
const { Menu } = remote;


//Attempts to get the user's screen 
async function getScreens() {

    const screens = await desktopCapturer.getSources({
        types: ['window', 'screen']
    });

    const screenOptions = Menu.buildFromTemplate(
        screens.map(source => {
            return {
                label: source.name,
                click: () => screenSelect(source)
            };
        })
    );

    screenOptions.popup();
}

//Select the screen and start recording
async function screenSelect(source) {

    videoSelect.innerText = source.name;

    const configurations = {
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: source.id
            }
        }
    };

    //Start the stream - Using built in Browser Navigator API
    const userStreaming = await navigator.mediaDevices
    .getUserMedia(configurations);

    //Now we preview the source in a video 
    video.srcObject = userStreaming;
    video.play();
}