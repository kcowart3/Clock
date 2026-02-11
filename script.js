const loadTime = Date.now();
let baseAnalogSeconds = 0;
let lastSyncTime = loadTime;
let isPaused = false;
let intervalId = null;

const secondsEl = document.querySelector(".seconds");
const minutesEl = document.querySelector(".minutes");
const hoursEl = document.querySelector(".hours");

function getAnalogSecondsTotal() {
  if (isPaused) return baseAnalogSeconds;
  return baseAnalogSeconds + ((Date.now() - lastSyncTime) / 1000) * 60;
}

function updateDigitalClock() {
  const analogSecondsTotal = Math.floor(getAnalogSecondsTotal());
  const sec = analogSecondsTotal % 60;
  const min = Math.floor(analogSecondsTotal / 60) % 60;
  let hr = Math.floor(analogSecondsTotal / 3600) % 12;
  if (hr === 0) hr = 12;

  const display = [
    hr.toString().padStart(2, "0"),
    min.toString().padStart(2, "0"),
    sec.toString().padStart(2, "0")
  ].join(":");

  document.getElementById("digitalClock").textContent = display;
}

function tick() {
  updateDigitalClock();
  if (!isPaused) intervalId = setTimeout(tick, 50);
}

function pause() {
  if (isPaused) return;
  clearTimeout(intervalId);
  isPaused = true;
  baseAnalogSeconds = getAnalogSecondsTotal();
  lastSyncTime = null;

  secondsEl.style.animationPlayState = "paused";
  minutesEl.style.animationPlayState = "paused";
  hoursEl.style.animationPlayState = "paused";

  document.getElementById("pauseBtn").textContent = "Resume";
  document.getElementById("pauseBtn").setAttribute("aria-label", "Resume clock");
}

function resume() {
  if (!isPaused) return;
  isPaused = false;
  lastSyncTime = Date.now();

  secondsEl.style.animationPlayState = "running";
  minutesEl.style.animationPlayState = "running";
  hoursEl.style.animationPlayState = "running";

  document.getElementById("pauseBtn").textContent = "Pause";
  document.getElementById("pauseBtn").setAttribute("aria-label", "Pause clock");

  intervalId = setTimeout(tick, 50);
}

document.getElementById("pauseBtn").addEventListener("click", () => {
  if (isPaused) resume();
  else pause();
});

updateDigitalClock();
intervalId = setTimeout(tick, 50);
