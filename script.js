
const startButton = document.querySelector('.start-button');
const counterDisplay = document.querySelector('#counter');
const buttonDiv = document.querySelector('.buttons');
const resetButton = document.querySelector('.reset-button');
const endButton = document.querySelector('.end-button');
const sessionList = document.querySelector('#sessionList');

startButton.addEventListener('click', startCounting); // start/pause/resume
resetButton.addEventListener('click', resetCounter);
endButton.addEventListener('click', endSession);

let seconds = 0;
let intervalID = null;
let sessions = JSON.parse(localStorage.getItem('sessions')) || [];

let startSessionDate;

sessions.forEach(function(sessionsElement) {
    let li = document.createElement('li');

    const startDate = new Date(sessionsElement.startTime);
    const formattedThen = formatDate(startDate);
    const nowDate = new Date();
    const formattedNow = formatDate(nowDate);
    const relativeDay = compareDates(formattedThen, formattedNow);
    
    li.textContent = relativeDay + " " + sessionsElement.duration;
    sessionList.appendChild(li);
});

function startCounting() {
    console.log('start/pause/resume');
    startSessionDate = new Date();

    if (intervalID === null) {
            intervalID = setInterval(function() {
            seconds += 1;
            secMinHou(seconds);
        }, 1000);
        startButton.textContent = 'PAUSE';
    } else if (typeof(intervalID) === 'number') {
        clearInterval(intervalID);
        intervalID = null;
        startButton.textContent = 'RESUME';
    }
}

function resetCounter() {
    console.log('reset');
    seconds = 0;
    secMinHou(seconds);
    startButton.textContent = 'START';
    if (intervalID !== null) {
        clearInterval(intervalID);
        intervalID = null;
    }
}

function endSession() {
    if (seconds !== 0) {
        let session = document.createElement('li');
        sessionList.appendChild(session);
        session.textContent = counter.textContent;
        resetCounter();
        
        sessions.push({duration: session.textContent, startTime: startSessionDate});
        localStorage.setItem('sessions', JSON.stringify(sessions));
    }
}

function secMinHou(totalSeconds) {
    let hours = Math.floor(totalSeconds/3600);
    let hoursRest = totalSeconds%3600;
    let minutes = Math.floor(hoursRest/60);
    let seconds = hoursRest%60; // seconds

    let h = leadingZero(hours);
    let m = leadingZero(minutes);
    let s = leadingZero(seconds);

    counterDisplay.textContent = `${h}:${m}:${s}`;
}

function leadingZero(num) {
    let text = num.toString();
    if (text.length === 1) {
        text = "0" + text;
    }
    return text;
}


function formatDate(unformattedDate) {
    let year = unformattedDate.getFullYear();
    let month = unformattedDate.getMonth();
    let day = unformattedDate.getDate();
    
    let formatted = {};
    formatted.year = year;
    formatted.month = month;
    formatted.day = day;

    return formatted;
}


function compareDates(sessionDate, actualDate) {
    let dayPresented;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    
    if (sessionDate.year === actualDate.year &&
    sessionDate.month === actualDate.month &&
    sessionDate.day === actualDate.day) {
        dayPresented = "Today";
    } else if (sessionDate.year === actualDate.year &&
        sessionDate.month === actualDate.month &&
        sessionDate.day === (actualDate.day-1)) {
        dayPresented = "Yesterday";
    } else {
        dayPresented = sessionDate.day + ' ' + months[sessionDate.month];
    }

    return dayPresented;
}
