
// ========================================
// ALL PLAYLISTS AND SONGS
// ========================================

const playlists = {

    jazz: [
        {
            title: "Table For Two",
            artist: "aron!",
            file: "music/jazz_tablefortwo.mp3"
        },
        {
            title: "It Could Happen To You",
            artist: "Laufey",
            file: "music/jazz_itcouldhappentoyou.mp3"
        },
        {
            title: "Nearness of You",
            artist: "Ella Fitzgerald",
            file: "music/jazz_nearnessofyou.mp3"
        }
    ],

    rnb: [
        {
            title: "Been Away",
            artist: "Brent Faiyaz",
            file: "music/Brent Faiyaz - Been Away (Audio).mp3"
        },
        {
            title: "Trust",
            artist: "Brent Faiyaz",
            file: "music/Brent Faiyaz - Trust (Official Video).mp3"
        },
        {
            title: "Thinkin' Bout You",
            artist: "Frank Ocean",
            file: "music/Thinkin Bout You.mp3"
        }
    ],

    rock: [
        {
            title: "Rock Song 1",
            artist: "Artist Seven",
            file: "music/rock1.mp3"
        },
        {
            title: "Rock Song 2",
            artist: "Artist Eight",
            file: "music/rock2.mp3"
        },
        {
            title: "Rock Song 3",
            artist: "Artist Nine",
            file: "music/rock3.mp3"
        }
    ],

    pop: [
        {
            title: "Pop Song 1",
            artist: "Artist Seven",
            file: "music/pop1.mp3"
        },
        {
            title: "Pop Song 2",
            artist: "Artist Eight",
            file: "music/pop2.mp3"
        },
        {
            title: "Pop Song 3",
            artist: "Artist Nine",
            file: "music/pop3.mp3"
        }
    ]

};


// ========================================
// GET HTML ELEMENTS
// ========================================

const audio = document.getElementById("audio");

const dropBox = document.getElementById("drop-box");
const dropText = document.getElementById("drop-text");

const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");

const songList = document.getElementById("song-list");

const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");

const progress = document.getElementById("progress");
const status = document.getElementById("status");


// ========================================
// CASSETTE ELEMENTS
// ========================================

const playlistBoxes = document.querySelectorAll(".playlist-box");


// ========================================
// CURRENT PLAYLIST AND SONG
// ========================================

let currentPlaylist = [];
let currentSong = 0;
let activePlaylistIndex = 0;


// ========================================
// CASSETTE SELECTION
// NO CAROUSEL MOVEMENT
// ========================================

function updateCarousel() {

    playlistBoxes.forEach(function(box, index) {

        box.classList.remove("active");

        if (index === activePlaylistIndex) {
            box.classList.add("active");
        }

    });

}


// ========================================
// DRAG AND DROP PLAYLISTS
// ========================================

playlistBoxes.forEach(function(box) {

    // START DRAGGING

    box.addEventListener("dragstart", function(event) {

        box.classList.add("dragging");

        event.dataTransfer.setData(
            "text/plain",
            box.dataset.name
        );

        event.dataTransfer.effectAllowed = "copy";

    });


    // END DRAGGING

    box.addEventListener("dragend", function() {

        box.classList.remove("dragging");

    });


    // CLICK CASSETTE TO SELECT PLAYLIST

    box.addEventListener("click", function() {

        activePlaylistIndex =
            Array.from(playlistBoxes).indexOf(box);

        updateCarousel();

        selectPlaylist(box.dataset.name);

    });

});


// ========================================
// DROP ZONE
// ========================================

// ALLOW DROP

dropBox.addEventListener("dragover", function(event) {

    event.preventDefault();

    dropBox.classList.add("drag-over");

});


// REMOVE HOVER EFFECT

dropBox.addEventListener("dragleave", function() {

    dropBox.classList.remove("drag-over");

});


// DROP PLAYLIST

dropBox.addEventListener("drop", function(event) {

    event.preventDefault();

    dropBox.classList.remove("drag-over");

    const playlistName =
        event.dataTransfer.getData("text/plain");

    if (playlists[playlistName]) {
        selectPlaylist(playlistName);
    }

});


// ========================================
// SELECT A PLAYLIST
// ========================================

function selectPlaylist(name) {

    if (!playlists[name]) {
        return;
    }

    // Load selected playlist
    currentPlaylist = playlists[name];

    // Start from first song
    currentSong = 0;

    // Find selected cassette
    activePlaylistIndex =
        Array.from(playlistBoxes).findIndex(function(box) {

            return box.dataset.name === name;

        });

    // Highlight selected cassette (without moving it)
    updateCarousel();

    // Update drop zone text
    dropText.textContent =
        "Selected: " + name.toUpperCase();

    // Display songs
    displaySongs();

    // Play first song
    playSong();

}


// ========================================
// DISPLAY SONGS
// ========================================

function displaySongs() {

    songList.innerHTML = "";

    for (let i = 0; i < currentPlaylist.length; i++) {

        let song = currentPlaylist[i];

        let li = document.createElement("li");

        li.textContent =
            song.title + " - " + song.artist;

        li.addEventListener("click", function() {

            currentSong = i;

            playSong();

        });

        songList.appendChild(li);

    }

    updateActiveSong();

}


// ========================================
// PLAY A SONG
// ========================================

function playSong() {

    if (currentPlaylist.length === 0) {
        return;
    }

    let song = currentPlaylist[currentSong];

    audio.src = song.file;

    songTitle.textContent = song.title;

    songArtist.textContent = song.artist;

    // Reset progress
    progress.value = 0;

    audio.play().then(function() {

        playButton.textContent = "⏸";

        document.querySelector(".cd").classList.add("playing");

        status.textContent = "";

    }).catch(function() {

        status.textContent =
            "Unable to play this song. Check your MP3 file.";

        playButton.textContent = "▶";

        document.querySelector(".cd").classList.remove("playing");

    });

    updateActiveSong();

}


// ========================================
// PLAY AND PAUSE BUTTON
// ========================================

playButton.addEventListener("click", function() {

    if (currentPlaylist.length === 0) {

        status.textContent =
            "Please choose a playlist first.";

        return;

    }

    if (audio.paused) {

        audio.play().then(function() {

            playButton.textContent = "⏸";

            document.querySelector(".cd").classList.add("playing");

            status.textContent = "";

        }).catch(function() {

            status.textContent =
                "Unable to play this song. Check your MP3 file.";

        });

    } else {

        audio.pause();

        playButton.textContent = "▶";

        document.querySelector(".cd").classList.remove("playing");

    }

});


// ========================================
// NEXT SONG
// ========================================

nextButton.addEventListener("click", function() {

    if (currentPlaylist.length === 0) {
        return;
    }

    currentSong++;

    if (currentSong >= currentPlaylist.length) {
        currentSong = 0;
    }

    playSong();

});


// ========================================
// PREVIOUS SONG
// ========================================

previousButton.addEventListener("click", function() {

    if (currentPlaylist.length === 0) {
        return;
    }

    currentSong--;

    if (currentSong < 0) {
        currentSong = currentPlaylist.length - 1;
    }

    playSong();

});


// ========================================
// AUTOMATICALLY PLAY NEXT SONG
// ========================================

audio.addEventListener("ended", function() {

    if (currentPlaylist.length === 0) {
        return;
    }

    currentSong++;

    if (currentSong >= currentPlaylist.length) {
        currentSong = 0;
    }

    playSong();

});


// ========================================
// UPDATE SONG PROGRESS
// ========================================

audio.addEventListener("timeupdate", function() {

    if (audio.duration) {

        let percentage =
            (audio.currentTime / audio.duration) * 100;

        progress.value = percentage;

    }

});


// ========================================
// MOVE THROUGH SONG USING PROGRESS BAR
// ========================================

progress.addEventListener("input", function() {

    if (audio.duration) {

        audio.currentTime =
            (progress.value / 100) * audio.duration;

    }

});


// ========================================
// HIGHLIGHT CURRENT SONG
// ========================================

function updateActiveSong() {

    let songs = songList.querySelectorAll("li");

    songs.forEach(function(song, index) {

        song.classList.remove("active");

        if (index === currentSong) {
            song.classList.add("active");
        }

    });

}


// ========================================
// INITIALISE CASSETTES
// NO MOVEMENT
// ========================================

updateCarousel();
