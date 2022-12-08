let sound = new Audio('./resources/alarm.mp3')

playButton.addEventListener('click', () => {
    sound.play();
});
pauseButton.addEventListener('click', () => {
    sound.pause();
})