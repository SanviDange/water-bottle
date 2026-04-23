const stillWater = document.querySelector('.still-water');
const drinkSound = document.getElementById('drinkSound');

let lastScroll = 0;
let fill = 100;
let scrollTimeout;
let drinkAudioUnlocked = false;

// Unlock drinkSound on this page
function unlockDrinkAudio() {
  if (drinkAudioUnlocked) return;
  drinkSound.play().catch(() => {}).then(() => {
    drinkSound.pause();
    drinkSound.currentTime = 0;
    drinkAudioUnlocked = true;
  });
}

document.addEventListener('mousedown', unlockDrinkAudio, { once: true });
document.addEventListener('touchstart', unlockDrinkAudio, { once: true });

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  const level = currentScroll - lastScroll;

  if (level > 0) {
    fill -= level * 0.038;
    fill = Math.max(fill, 0);
    stillWater.style.setProperty('--fill', fill);
  }

  lastScroll = currentScroll;

  if (drinkSound.paused) {
    drinkSound.currentTime = 0;
    drinkSound.play().catch(() => {});
  }

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    drinkSound.pause();
    drinkSound.currentTime = 0;
  }, 150);
});