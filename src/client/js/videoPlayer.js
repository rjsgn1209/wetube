const containerPlayBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const video = document.querySelector("video");
const timeline = document.getElementById("timeline");
const videoContainer = document.getElementById("videoContainer");
const fullScreenBtn = document.getElementById("fullScreen");
const videoControls = document.getElementById("videoControls");
const videoContainerBtn = document.querySelector(".videoContainer__btn");
const playButton = document.getElementById("playIcon");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  containerPlayBtn.classList = video.paused ? "fas fa-play" : "fas fa-pause";
  playButton.classList = video.paused
    ? "fas fa-play fa-3x"
    : "fas fa-pause fa-3x";
};

const handleMuteClick = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (e) => {
  const {
    target: { value },
  } = e;

  if (video.muted) {
    video.muted = false;
    muteBtn.classList = "fas fa-volume-up";
  }
  if (Number(value) === 0) {
    video.muted = true;
    muteBtn.classList = "fas fa-volume-mute";
  }

  video.volume = value;
  volumeValue = value;
};

const timeFormatting = (second) =>
  new Date(second * 1000).toISOString().substr(14, 5);
const handleLoadedMetadata = () => {
  totalTime.innerText = timeFormatting(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currenTime.innerText = timeFormatting(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (e) => {
  const {
    target: { value },
  } = e;
  video.currentTime = value;
};

const handleFullScreen = () => {
  const fullscreen = document.fullscreenElement;
  console.log(fullscreen);
  if (fullscreen) {
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
};

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  videoContainerBtn.classList.add("showing");
  controlsMovementTimeout = setTimeout(() => {
    videoControls.classList.remove("showing");
    videoContainerBtn.classList.remove("showing");
  }, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(() => {
    videoControls.classList.remove("showing");
    videoContainerBtn.classList.remove("showing");
  }, 3000);
};

const handleViewUpdate = () => {
  const id = videoContainer.dataset.id;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

containerPlayBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleViewUpdate);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
videoContainerBtn.addEventListener("click", handlePlayClick);
window.addEventListener("keypress", () => {
  if (window.event.keyCode === 32) {
    handlePlayClick();
    handleMouseMove();
  }
});
