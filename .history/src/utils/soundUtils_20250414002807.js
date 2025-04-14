// utils/soundUtils.js
export function playSound(src) {
    const audio = new Audio(src);
    audio.play();
  }