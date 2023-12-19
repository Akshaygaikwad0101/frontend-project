let stopwatchInterval;
let timerInterval;
let stopwatchSeconds = 0;
let timerSeconds = 0;

function startStopwatch() {
  stopwatchInterval = setInterval(() => {
    stopwatchSeconds++;
    displayTime("stopwatch-display", stopwatchSeconds);
  }, 1000);
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchSeconds = 0;
  displayTime("stopwatch-display", stopwatchSeconds);
}

function startTimer() {
  const timerInput = document.getElementById("timer-input").value;
  if (timerInput && !timerInterval) {
    timerSeconds = timerInput;
    displayTime("timer-display", timerSeconds);
    timerInterval = setInterval(() => {
      if (timerSeconds <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        alert("Timer complete!");
      } else {
        timerSeconds--;
        displayTime("timer-display", timerSeconds);
      }
    }, 1000);
  }
}

function stopTimer() {
    // console.log("Stopping Timer");
    clearInterval(timerInterval);
  }
  

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerSeconds = 0;
  document.getElementById("timer-input").value = "";
  displayTime("timer-display", timerSeconds);
}

function displayTime(displayId, seconds) {
  const displayElement = document.getElementById(displayId);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  displayElement.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(remainingSeconds)}`;
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}
