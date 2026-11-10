
"use strict";

// ==================================
// CUSTOMISE YOUR PROFILE'S MUSIC
// ==================================

const album = {
  title: "Midnight Memories",
  artist: "My personal playlist",
  label: "SIDE A"
};

const tracks = [
  {
    title: "Maybe",
    artist: "Rym",
    src: "music/maybe.mp3"
  },
  {
    title: "My Favourite Song",
    artist: "Favourite Artist",
    src: "music/favourite.mp3"
  },
  {
    title: "Late Night",
    artist: "Another Artist",
    src: "music/late-night.mp3"
  }
];

// ==================================
// ELEMENTS
// ==================================

const audio = document.querySelector("#audio");
const cd = document.querySelector("#cd");
const playlist = document.querySelector("#playlist");

const playButton = document.querySelector("#play");
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
const shuffleButton = document.querySelector("#shuffle");
const repeatButton = document.querySelector("#repeat");

const progress = document.querySelector("#progress");
const volume = document.querySelector("#volume");

const titleElement = document.querySelector("#album-title");
const artistElement = document.querySelector("#artist-name");
const cdLabel = document.querySelector("#cd-label");
const currentTimeElement = document.querySelector("#current-time");
const durationElement = document.querySelector("#duration");
const statusElement = document.querySelector("#status");

let currentIndex = 0;
let shuffle = false;
let repeat = false;
let seeking = false;

// ==================================
// ALBUM DETAILS
// ==================================

titleElement.textContent = album.title;
artistElement.textContent = album.artist;
cdLabel.textContent = album.label;

// ==================================
// HELPERS
// ==================================

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);

  return `${minutes}:${String(remaining).padStart(2, "0")}`;
}

function updatePlaylist() {
  const buttons = playlist.querySelectorAll("button");

  buttons.forEach((button, index) => {
    if (index === currentIndex) {
      button.setAttribute("aria-current", "true");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

function renderPlaylist() {
  playlist.replaceChildren();

  tracks.forEach((track, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    const number = document.createElement("span");
    const details = document.createElement("span");
    const title = document.createElement("strong");
    const artist = document.createElement("span");
    const symbol = document.createElement("span");

    number.className = "track-number";
    number.textContent = String(index + 1).padStart(2, "0");

    details.className = "track-details";
    title.textContent = track.title;
    artist.textContent = track.artist;
    details.append(title, artist);

    symbol.className = "track-symbol";
    symbol.setAttribute("aria-hidden", "true");
    symbol.textContent = "♫";

    button.type = "button";
    button.append(number, details, symbol);

    button.addEventListener("click", () => {
      loadTrack(index, true);
    });

    item.append(button);
    playlist.append(item);
  });

  updatePlaylist();
}

// ==================================
// LOAD AND PLAY MUSIC
// ==================================

function loadTrack(index, autoplay = false) {
  if (tracks.length === 0) return;

  currentIndex = (index + tracks.length) % tracks.length;

  const track = tracks[currentIndex];

  audio.pause();
  audio.src = track.src;
  audio.load();

  // The document title identifies the current track.
  document.title = `${track.title} — ${album.title}`;

  currentTimeElement.textContent = "0:00";
  durationElement.textContent = "0:00";
  progress.value = 0;

  playButton.textContent = "▶";
  playButton.setAttribute("aria-label", `Play ${track.title}`);
  cd.classList.remove("spinning");

  statusElement.textContent = `Selected: ${track.title}`;

  updatePlaylist();

  if (autoplay) {
    playTrack();
  }
}

async function playTrack() {
  if (tracks.length === 0) return;

  try {
    await audio.play();

    playButton.textContent = "Ⅱ";
    playButton.setAttribute(
      "aria-label",
      `Pause ${tracks[currentIndex].title}`
    );

    cd.classList.add("spinning");
    statusElement.textContent = `Playing: ${tracks[currentIndex].title}`;
  } catch (error) {
    cd.classList.remove("spinning");
    statusElement.textContent =
      "Unable to play this song. Check the audio file path.";

    console.error("Playback failed:", error);
  }
}

function pauseTrack() {
  audio.pause();
  cd.classList.remove("spinning");

  playButton.textContent = "▶";
  playButton.setAttribute(
    "aria-label",
    `Play ${tracks[currentIndex].title}`
  );

  statusElement.textContent = "Paused";
}

playButton.addEventListener("click", () => {
  if (audio.paused) {
    playTrack();
  } else {
    pauseTrack();
  }
});

previousButton.addEventListener("click", () => {
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }

  loadTrack(currentIndex - 1, true);
});

nextButton.addEventListener("click", () => {
  if (shuffle && tracks.length > 1) {
    playRandomTrack();
  } else {
    loadTrack(currentIndex + 1, true);
  }
});

// ==================================
// PROGRESS AND VOLUME
// ==================================

audio.volume = Number(volume.value);

audio.addEventListener("loadedmetadata", () => {
  durationElement.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  currentTimeElement.textContent = formatTime(audio.currentTime);

  if (!seeking && Number.isFinite(audio.duration)) {
    progress.value = audio.duration > 0
      ? (audio.currentTime / audio.duration) * 100
      : 0;
  }
});

progress.addEventListener("input", () => {
  seeking = true;

  const newTime =
    (Number(progress.value) / 100) * (audio.duration || 0);

  currentTimeElement.textContent = formatTime(newTime);
});

progress.addEventListener("change", () => {
  if (Number.isFinite(audio.duration)) {
    audio.currentTime =
      (Number(progress.value) / 100) * audio.duration;
  }

  seeking = false;
});

volume.addEventListener("input", () => {
  audio.volume = Number(volume.value);
});

// ==================================
// SHUFFLE AND REPEAT
// ==================================

function playRandomTrack() {
  if (tracks.length === 0) return;

  let nextIndex = currentIndex;

  if (tracks.length > 1) {
    while (nextIndex === currentIndex) {
      nextIndex = Math.floor(Math.random() * tracks.length);
    }
  }

  loadTrack(nextIndex, true);
}

shuffleButton.addEventListener("click", () => {
  shuffle = !shuffle;

  shuffleButton.setAttribute("aria-pressed", String(shuffle));
  shuffleButton.textContent = `⇄ Shuffle: ${shuffle ? "On" : "Off"}`;
});

repeatButton.addEventListener("click", () => {
  repeat = !repeat;

  repeatButton.setAttribute("aria-pressed", String(repeat));
  repeatButton.textContent = `↻ Repeat: ${repeat ? "On" : "Off"}`;
});

audio.addEventListener("ended", () => {
  if (repeat) {
    audio.currentTime = 0;
    playTrack();
  } else if (shuffle && tracks.length > 1) {
    playRandomTrack();
  } else if (currentIndex < tracks.length - 1) {
    loadTrack(currentIndex + 1, true);
  } else {
    // Stop at the end of the playlist.
    cd.classList.remove("spinning");
    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", "Play music");
    statusElement.textContent = "Playlist finished";
  }
});

audio.addEventListener("error", () => {
  cd.classList.remove("spinning");
  statusElement.textContent =
    "Song unavailable. Check its filename and location.";
});

// ==================================
// INITIALISE
// ==================================

renderPlaylist();

if (tracks.length > 0) {
  loadTrack(0);
} else {
  titleElement.textContent = "No songs yet";
  artistElement.textContent = "Add songs to script.js";
  playButton.disabled = true;
  previousButton.disabled = true;
  nextButton.disabled = true;
}

