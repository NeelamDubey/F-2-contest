const activeTimers = [];

function startTimer(hours, minutes, seconds) {
  const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
  let currentTime = totalTimeInSeconds;

  const timerId = setInterval(() => {
    if (currentTime <= 0) {
      clearInterval(timerId);
      displayTimerEnd(timerId);
      playAudioAlert();
    }

    const hoursRemaining = Math.floor(currentTime / 3600);
    const minutesRemaining = Math.floor((currentTime % 3600) / 60);
    const secondsRemaining = currentTime % 60;

    const timerElement = document.getElementById(timerId);
    timerElement.innerText = `${hoursRemaining}:${String(minutesRemaining).padStart(2, '0')}:${String(secondsRemaining).padStart(2, '0')}`;

    currentTime--;
  }, 1000);

  activeTimers.push({ id: timerId, totalTime: totalTimeInSeconds });

  createTimerElement(timerId, totalTimeInSeconds);
}

function createTimerElement(timerId, totalTimeInSeconds) {
  const timerElement = document.createElement('div');
  timerElement.id = timerId;
  timerElement.innerHTML = `${totalTimeInSeconds / 3600}:${(totalTimeInSeconds % 3600) / 60}:${totalTimeInSeconds % 60} <button onclick="stopTimer('${timerId}')">Stop Timer</button>`;
  document.getElementById('activeTimersSection').appendChild(timerElement);
}

function stopTimer(timerId) {
  clearInterval(timerId);
  const timerElement = document.getElementById(timerId);
  timerElement.remove();
  const timerIndex = activeTimers.findIndex(timer => timer.id === timerId);
  if (timerIndex !== -1) {
    activeTimers.splice(timerIndex, 1);
  }
}

function displayTimerEnd(timerId) {
  const timerElement = document.getElementById(timerId);
  timerElement.classList.add('timer-ended');
}

function playAudioAlert() {
  const audio = new Audio('alert.mp3'); // Replace 'alert.mp3' with your audio file
  audio.play();
}

function updateActiveTimersDisplay() {
  activeTimers.forEach(timerData => {
    const { id, totalTime } = timerData;
    const timerElement = document.getElementById(id);

    const hoursRemaining = Math.floor(totalTime / 3600);
    const minutesRemaining = Math.floor((totalTime % 3600) / 60);
    const secondsRemaining = totalTime % 60;

    timerElement.innerText = `${hoursRemaining}:${String(minutesRemaining).padStart(2, '0')}:${String(secondsRemaining).padStart(2, '0')}`;

    if (totalTime <= 0) {
      displayTimerEnd(id);
      playAudioAlert();
    } else {
      timerData.totalTime--;
    }
  });
}

setInterval(updateActiveTimersDisplay, 1000);
