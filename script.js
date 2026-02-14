console.log('JS file loaded');

const startButton = document.querySelector('.start-button');
const counterDisplay = document.querySelector('#counter');

startButton.addEventListener('click', startCounting);

let seconds = 0;

function startCounting() {
    console.log("button clicked");
    setInterval(function() {
        seconds = seconds + 1;
        counterDisplay.textContent = seconds;
        console.log("seconds");
    }, 1000);
}