const keys = document.querySelectorAll(".key");
const keyCode = {
  A: 65,
  S: 83,
  D: 68,
  F: 70,
  G: 71,
  H: 72,
  J: 74,
  K: 75,
  L: 76,
  B: 66,
};
let isPlaying = false;
let playingKey;

function playing(e) {
  const audio = document.querySelector(
    `audio[data-key="${e.keyCode || keyCode[e.target.innerHTML]}"`
  );
  const key = document.querySelector(
    `div[data-key="${e.keyCode || keyCode[e.target.innerHTML]}"]`
  );
  if (isPlaying) {
    document.querySelector(`audio[data-key="${keyCode[playingKey]}"]`).pause();
    document
      .querySelector(`div[data-key="${keyCode[playingKey]}"]`)
      .classList.remove("playing");
  }

  if (!audio) return false;
  key.classList.add("playing");
  audio.currentTime = 0;
  let audioDuration = audio.duration * 1000;

  audio.play();
  isPlaying = true;
  if (e.key) {
    playingKey = e.key.toUpperCase();
    setTimeout(() => {
      document
        .querySelector(`div[data-key="${keyCode[playingKey]}"]`)
        .classList.remove("playing");
    }, audioDuration);
  } else {
    playingKey = e.target.innerHTML;
    setTimeout(() => {
      key.classList.remove("playing");
    }, audioDuration);
  }
}
keys.forEach((key) => key.addEventListener("click", (e) => playing(e)));
window.addEventListener("keydown", (e) => {
  playing(e);
});
