// ----------------------
// ELEMENTS
// ----------------------
const cap = document.getElementById('cap');
const entry = document.getElementById('entry');

const capSound = document.getElementById('capSound');
const drinkSound = document.getElementById('drinkSound');

let audioUnlocked = false;

// ----------------------
// AUDIO UNLOCK (ONE TIME)
// ----------------------
function unlockAudio() {
  if (audioUnlocked) return;

  Promise.all([
    capSound.play().catch(() => {}),
    drinkSound.play().catch(() => {})
  ]).then(() => {
    capSound.pause();
    capSound.currentTime = 0;

    drinkSound.pause();
    drinkSound.currentTime = 0;

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
let capSoundPlaying = false;       // NEW: track if sound is actively playing
let capSoundStopTimer = null;      // NEW: debounce timer to pause on stillness

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

  // 🔊 cap sound — continuous during turn, pauses only when still
  if (audioUnlocked) {
    const speed = Math.abs(diff);

    if (speed > 1) {
      // Clear any pending stop
      clearTimeout(capSoundStopTimer);

      // Adjust volume to twist speed
      capSound.volume = Math.min(speed / 20, 1);

      // Only (re)start if not already playing — let it run continuously
      if (!capSoundPlaying) {
        capSound.loop = true;
        capSound.play().catch(() => {});
        capSoundPlaying = true;
      }

      // Schedule a pause shortly after movement stops
      capSoundStopTimer = setTimeout(() => {
        capSound.pause();
        capSoundPlaying = false;
      }, 80);
    }
  }

  if (totalRotation > 1080) {
    openBottle();
  }
});

window.addEventListener('mouseup', () => {
  isDragging = false;
  cap.style.cursor = 'grab';

  // Stop sound immediately on release
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