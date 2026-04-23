const stillWater = document.querySelector('.still-water');
let lastScroll = 0;
let fill = 100;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  const level = currentScroll - lastScroll;

  if (level > 0) {
    // decrease gradually based on scroll movement
    fill -= level * 0.038; // tweak this value
    fill = Math.max(fill, 0);

    stillWater.style.setProperty('--fill', fill);
  }

  lastScroll = currentScroll;
});

//THE SOUND
const drinkSound = document.getElementById('drinkSound');

let scrollTimeout;

window.addEventListener('scroll', () => {
  // start / ensure playing
  if (drinkSound.paused) {
    drinkSound.currentTime = 0;
    drinkSound.play();
  }

  // reset stop timer every scroll event
  clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(() => {
    drinkSound.pause();   // stop sound
    drinkSound.currentTime = 0; // optional reset
  }, 150); // delay = "scroll stopped" threshold
});