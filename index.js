

// ALL PLAYLISTS AND SONGS

const playlists = {

    jazz: [
        {
            title: "Table For Two",
            artist: "aron!",
            file: "/music/jazz_tablefortwo.mp3"
        },
        {
            title: "It Could Happen To You",
            artist: "Laufey",
            file: "/music/jazz_itcouldhappentoyou.mp3"
        },
        {
            title: "Nearness of You",
            artist: "Ella Fitzgerald",
            file: "/music/jazz_nearnessofyou.mp3"
        }
    ],

    rnb: [
        {
            title: "R&B Song 1",
            artist: "Artist Four",
            file: "music/rnb1.mp3"
        },
        {
            title: "R&B Song 2",
            artist: "Artist Five",
            file: "music/rnb2.mp3"
        },
        {
            title: "R&B Song 3",
            artist: "Artist Six",
            file: "music/rnb3.mp3"
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
    ],


};


// GET HTML ELEMENTS

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


// CURRENT PLAYLIST AND SONG

let currentPlaylist = [];
let currentSong = 0;


// DRAG AND DROP PLAYLISTS

const playlistBoxes = document.querySelectorAll(".playlist-box");

playlistBoxes.forEach(function(box) {

    box.addEventListener("dragstart", function() {
        box.classList.add("dragging");
    });

    box.addEventListener("dragend", function() {
        box.classList.remove("dragging");
    });

    // CLICK TO SELECT A PLAYLIST
    box.addEventListener("click", function() {
        selectPlaylist(box.dataset.name);
    });

});


// ALLOW PLAYLIST TO BE DROPPED

dropBox.addEventListener("dragover", function(event) {
    event.preventDefault();
    dropBox.classList.add("drag-over");
});

dropBox.addEventListener("dragleave", function() {
    dropBox.classList.remove("drag-over");
});

dropBox.addEventListener("drop", function(event) {

    event.preventDefault();

    dropBox.classList.remove("drag-over");

    const selectedBox = document.querySelector(".playlist-box.dragging");

    if (selectedBox) {
        selectPlaylist(selectedBox.dataset.name);
    }

});


// SELECT A PLAYLIST

function selectPlaylist(name) {

    currentPlaylist = playlists[name];

    currentSong = 0;

    dropText.textContent = "Selected: " + name.toUpperCase();

    displaySongs();

    playSong();

}


// DISPLAY SONGS

function displaySongs() {

    songList.innerHTML = "";

    for (let i = 0; i < currentPlaylist.length; i++) {

        let song = currentPlaylist[i];

        let li = document.createElement("li");

        li.textContent = song.title + " - " + song.artist;

        li.addEventListener("click", function() {

            currentSong = i;

            playSong();

        });

        songList.appendChild(li);

    }

    updateActiveSong();

}


// PLAY A SONG

function playSong() {

    let song = currentPlaylist[currentSong];

    audio.src = song.file;

    songTitle.textContent = song.title;

    songArtist.textContent = song.artist;

    audio.play().then(function() {
        playButton.textContent = "⏸";
        document.querySelector(".cd").classList.add("playing");
        status.textContent = "";
    }).catch(function() {
        status.textContent = "Unable to play this song. Check your MP3 file.";
        playButton.textContent = "▶";
        document.querySelector(".cd").classList.remove("playing");
    });

    updateActiveSong();

}


// PLAY AND PAUSE BUTTON

playButton.addEventListener("click", function() {

    if (currentPlaylist.length === 0) {
        status.textContent = "Please choose a playlist first.";
        return;
    }

    if (audio.paused) {

        audio.play().then(function() {
            playButton.textContent = "⏸";
            document.querySelector(".cd").classList.add("playing");
            status.textContent = "";
        }).catch(function() {
            status.textContent = "Unable to play this song. Check your MP3 file.";
        });

    } else {

        audio.pause();

        playButton.textContent = "▶";

        document.querySelector(".cd").classList.remove("playing");

    }

});


// NEXT SONG

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


// PREVIOUS SONG

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


// AUTOMATICALLY PLAY NEXT SONG

audio.addEventListener("ended", function() {

    currentSong++;

    if (currentSong >= currentPlaylist.length) {
        currentSong = 0;
    }

    playSong();

});


// UPDATE SONG PROGRESS

audio.addEventListener("timeupdate", function() {

    if (audio.duration) {

        let percentage = (audio.currentTime / audio.duration) * 100;

        progress.value = percentage;

    }

});


// MOVE THROUGH SONG USING PROGRESS BAR

progress.addEventListener("input", function() {

    if (audio.duration) {

        audio.currentTime = (progress.value / 100) * audio.duration;

    }

});


// HIGHLIGHT CURRENT SONG

function updateActiveSong() {

    let songs = songList.querySelectorAll("li");

    songs.forEach(function(song, index) {

        song.classList.remove("active");

        if (index === currentSong) {
            song.classList.add("active");
        }

    });

}
