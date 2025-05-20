let timerInterval = null;
let elapsedTime = 0; 
let lapTimes = [];

const timeDisplay = document.querySelector('.time');
const lapTimesContainer = document.querySelector('.lap-times');

document.querySelector('.Start').addEventListener('click', startTimer);
document.querySelector('.Stop').addEventListener('click', stopTimer);
document.querySelector('.Reset').addEventListener('click', resetTimer);
document.querySelector('.Lap').addEventListener('click', recordLap);

function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      elapsedTime++;
      updateDisplay();
    }, 1000);
  }
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function resetTimer() {
  stopTimer();
  elapsedTime = 0;
  lapTimes = [];
  updateDisplay();
  clearLapTimes();
}

function recordLap() {
  if (elapsedTime === 0) return; 
  const lapTime = formatTime(elapsedTime);
  lapTimes.push(lapTime);
  renderLapTimes();
  scrollLapTimesToBottom();
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(totalSeconds) {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function renderLapTimes() {
  lapTimesContainer.innerHTML = '';
  lapTimes.forEach((time, index) => {
    const lapItem = document.createElement('div');
    lapItem.className = 'lap-item';
    lapItem.textContent = `Lap ${index + 1}: ${time}`;
    lapTimesContainer.appendChild(lapItem);
  });
}

function clearLapTimes() {
  lapTimesContainer.innerHTML = '';
}

function scrollLapTimesToBottom() {
  lapTimesContainer.scrollTop = lapTimesContainer.scrollHeight;
}
