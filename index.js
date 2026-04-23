// ----------------------
// ELEMENTS
// ----------------------
const cap = document.getElementById('cap');
const entry = document.getElementById('entry');
const capSound = document.getElementById('capSound');

let audioUnlocked = false;

// ----------------------
// AUDIO UNLOCK (ONE TIME)
// ----------------------
function unlockAudio() {
  if (audioUnlocked) return;

  capSound.play().catch(() => {}).then(() => {
    capSound.pause();
    capSound.currentTime = 0;
    audioUnlocked = true;
  });
}

document.addEventListener('mousedown', unlockAudio, { once: true });
document.addEventListener('touchstart', unlockAudio, { once: true });

// ----------------------
// CAP ROTATION
// ----------------------
let isDragging = false;
let startX = 0;
let totalRotation = 0;
let capSoundPlaying = false;
let capSoundStopTimer = null;

cap.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  cap.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const diff = e.clientX - startX;
  totalRotation += diff * 0.5;
  startX = e.clientX;

  cap.style.transform = `rotate(${totalRotation}deg)`;

  if (audioUnlocked) {
    const speed = Math.abs(diff);

    if (speed > 1) {
      clearTimeout(capSoundStopTimer);

      capSound.volume = Math.min(speed / 20, 1);
      capSound.loop = true;

      if (capSound.paused) {
        capSound.play().catch(() => {});
      }
      capSoundPlaying = true;

      capSoundStopTimer = setTimeout(() => {
        capSound.pause();
        capSoundPlaying = false;
      }, 80);
    }
  }

  if (totalRotation > 720) {
    openBottle();
  }
});

window.addEventListener('mouseup', () => {
  isDragging = false;
  cap.style.cursor = 'grab';

  clearTimeout(capSoundStopTimer);
  capSound.pause();
  capSoundPlaying = false;
});

// ----------------------
// OPEN BOTTLE
// ----------------------
function openBottle() {
  isDragging = false;
  entry.style.opacity = '0';

  setTimeout(() => {
    window.location.href = 'water.html';
  }, 800);
}