/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ (() => {

eval("var containerPlayBtn = document.getElementById(\"play\");\nvar muteBtn = document.getElementById(\"mute\");\nvar currenTime = document.getElementById(\"currenTime\");\nvar totalTime = document.getElementById(\"totalTime\");\nvar volumeRange = document.getElementById(\"volume\");\nvar video = document.querySelector(\"video\");\nvar timeline = document.getElementById(\"timeline\");\nvar videoContainer = document.getElementById(\"videoContainer\");\nvar fullScreenBtn = document.getElementById(\"fullScreen\");\nvar videoControls = document.getElementById(\"videoControls\");\nvar videoContainerBtn = document.querySelector(\".videoContainer__btn\");\nvar playButton = document.getElementById(\"playIcon\");\nvar controlsTimeout = null;\nvar controlsMovementTimeout = null;\nvar volumeValue = 0.5;\nvideo.volume = volumeValue;\n\nvar handlePlayClick = function handlePlayClick(e) {\n  if (video.paused) {\n    video.play();\n  } else {\n    video.pause();\n  }\n\n  containerPlayBtn.classList = video.paused ? \"fas fa-play\" : \"fas fa-pause\";\n  playButton.classList = video.paused ? \"fas fa-play fa-3x\" : \"fas fa-pause fa-3x\";\n};\n\nvar handleMuteClick = function handleMuteClick() {\n  if (video.muted) {\n    video.muted = false;\n  } else {\n    video.muted = true;\n  }\n\n  muteBtn.classList = video.muted ? \"fas fa-volume-mute\" : \"fas fa-volume-up\";\n  volumeRange.value = video.muted ? 0 : volumeValue;\n};\n\nvar handleVolumeChange = function handleVolumeChange(e) {\n  var value = e.target.value;\n\n  if (video.muted) {\n    video.muted = false;\n    muteBtn.classList = \"fas fa-volume-up\";\n  }\n\n  if (Number(value) === 0) {\n    video.muted = true;\n    muteBtn.classList = \"fas fa-volume-mute\";\n  }\n\n  video.volume = value;\n  volumeValue = value;\n};\n\nvar timeFormatting = function timeFormatting(second) {\n  return new Date(second * 1000).toISOString().substr(14, 5);\n};\n\nvar handleLoadedMetadata = function handleLoadedMetadata() {\n  totalTime.innerText = timeFormatting(Math.floor(video.duration));\n  timeline.max = Math.floor(video.duration);\n};\n\nvar handleTimeUpdate = function handleTimeUpdate() {\n  currenTime.innerText = timeFormatting(Math.floor(video.currentTime));\n  timeline.value = Math.floor(video.currentTime);\n};\n\nvar handleTimelineChange = function handleTimelineChange(e) {\n  var value = e.target.value;\n  video.currentTime = value;\n};\n\nvar handleFullScreen = function handleFullScreen() {\n  var fullscreen = document.fullscreenElement;\n  console.log(fullscreen);\n\n  if (fullscreen) {\n    document.exitFullscreen();\n  } else {\n    videoContainer.requestFullscreen();\n  }\n};\n\nvar handleMouseMove = function handleMouseMove() {\n  if (controlsTimeout) {\n    clearTimeout(controlsTimeout);\n    controlsTimeout = null;\n  }\n\n  if (controlsMovementTimeout) {\n    clearTimeout(controlsMovementTimeout);\n    controlsMovementTimeout = null;\n  }\n\n  videoControls.classList.add(\"showing\");\n  videoContainerBtn.classList.add(\"showing\");\n  controlsMovementTimeout = setTimeout(function () {\n    videoControls.classList.remove(\"showing\");\n    videoContainerBtn.classList.remove(\"showing\");\n  }, 3000);\n};\n\nvar handleMouseLeave = function handleMouseLeave() {\n  controlsTimeout = setTimeout(function () {\n    videoControls.classList.remove(\"showing\");\n    videoContainerBtn.classList.remove(\"showing\");\n  }, 3000);\n};\n\nvar handleViewUpdate = function handleViewUpdate() {\n  var id = videoContainer.dataset.id;\n  fetch(\"/api/videos/\".concat(id, \"/view\"), {\n    method: \"POST\"\n  });\n};\n\ncontainerPlayBtn.addEventListener(\"click\", handlePlayClick);\nmuteBtn.addEventListener(\"click\", handleMuteClick);\nvolumeRange.addEventListener(\"input\", handleVolumeChange);\nvideo.addEventListener(\"loadedmetadata\", handleLoadedMetadata);\nvideo.addEventListener(\"timeupdate\", handleTimeUpdate);\nvideo.addEventListener(\"ended\", handleViewUpdate);\ntimeline.addEventListener(\"input\", handleTimelineChange);\nfullScreenBtn.addEventListener(\"click\", handleFullScreen);\nvideoContainer.addEventListener(\"mousemove\", handleMouseMove);\nvideoContainer.addEventListener(\"mouseleave\", handleMouseLeave);\nvideoContainerBtn.addEventListener(\"click\", handlePlayClick);\nwindow.addEventListener(\"keypress\", function () {\n  if (window.event.keyCode === 32) {\n    handlePlayClick();\n    handleMouseMove();\n  }\n});\n\n//# sourceURL=webpack://wetube/./src/client/js/videoPlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/videoPlayer.js"]();
/******/ 	
/******/ })()
;