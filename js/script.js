const player = document.querySelector(".player"),
  playBtn = document.querySelector(".play"),
  prevBtn = document.querySelector(".prev"),
  nextBtn = document.querySelector(".next"),
  audio = document.querySelector(".audio"),
  progressContainer = document.querySelector(".progress__container"),
  progress = document.querySelector(".progress"),
  title = document.querySelector(".song"),
  cover = document.querySelector(".cover__img"),
  imgSrc = document.querySelector(".img__src"),
  wrapper = document.querySelector(".wrapper");

// musicList
const songs = ["Ласточки", "JANAYA JANAJANA"];

//defaultTrack
let songIndex = 0;

// init
function loadSong(song) {
  title.innerHTML = song;
  audio.src = `audio/${song}.mp3`;
  cover.src = `img/cover${songIndex + 1}.jpg`;
}

loadSong(songs[songIndex]);

//play
function playSong() {
  player.classList.add("play");
  cover.classList.add("active");
  imgSrc.src = "./img/icons/pause.svg";
  audio.play();
}

//pause
function pauseSong() {
  player.classList.remove("play");
  cover.classList.remove("active");
  imgSrc.src = "./img/icons/play.svg";
  audio.pause();
}

playBtn.addEventListener("click", () => {
  const isPlaying = player.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//next
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

nextBtn.addEventListener("click", nextSong);

//prev

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

prevBtn.addEventListener("click", prevSong);

//progressBar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  function bg() {
    return (wrapper.style.backgroundImage = "url(./img/j1.jpg)");
  }
  function bg1() {
    return (wrapper.style.backgroundImage = "url(./img/j2.jpg)");
  }
  if (duration === 197.067755) {
    wrapper.style.backgroundImage = "url(./img/image-17-3.jpg)";
  } else if (duration === 227.004082) {
    setTimeout(bg);
    setTimeout(bg1, 2000);
  }
}

audio.addEventListener("timeupdate", updateProgress);

//set progress

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}
progressContainer.addEventListener("click", setProgress);

//autoPlay

audio.addEventListener("ended", nextSong);

// if (songIndex === 0) {
//   console.log("eje");
// } else if (songIndex === 1) {
//   console.log("Nap");
// }
