const loadTime = Date.now();

function updateDigitalClock() {
  const elapsedMs = Date.now() - loadTime;
  const analogSecondsTotal = Math.floor((elapsedMs / 1000) * 60);

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

updateDigitalClock();
setInterval(updateDigitalClock, 50);
