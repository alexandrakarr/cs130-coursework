const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {
    console.log(`
        get tracks from spotify based on the search term
        "${term}" and load them into the #tracks section 
        of the DOM...`);
    const element = document.querySelector("#tracks")
    element.innerHTML = ""
    fetch(baseURL + "?type=track&q=" + term)
    .then(response=>response.json())
    .then((data)=>{
        if (data.length == 0) {
            document.querySelector("#tracks").innerHTML += "No tracks found that match your search criteria."
        }
        if(data.length > 0){
            for(track of data.slice(0,5)){
                element.innerHTML +=`<button class="track-item preview" data-preview-track="${track.preview_url}" onclick="handleTrackClick(event);">
                <img src="${track.album.image_url}">
                <i class="fas play-track fa-play" aria-hidden="true"></i>
                <div class="label">
                    <h2>${track.name}</h2>
                    <p>
                        ${track.artist.name}
                    </p>
                </div>
            </button>`
            } 
        }
    })
};

const getAlbums = (term) => {
    console.log(`
        get albums from spotify based on the search term
        "${term}" and load them into the #albums section 
        of the DOM...`);
    const element = document.querySelector("#albums")
    element.innerHTML = ""
    fetch(baseURL + "?type=album&q=" + term)
    .then(response=>response.json())
    .then((data)=>{
        if (data.length == 0) {
            document.querySelector("#albums").innerHTML += "No albums found that match your search criteria."
        }
        if(data.length > 0){
            for(album of data){
                element.innerHTML +=`<section class="album-card" id="${album.id}">
                <div>
                    <img src="${album.image_url}">
                    <h2>${album.name}</h2>
                    <div class="footer">
                        <a href="${album.spotify_url}" target="_blank">
                            view on spotify
                        </a>
                    </div>
                </div>
            </section>`
            } 
        }
    })
};

const getArtist = (term) => {
    console.log(`
        get artists from spotify based on the search term
        "${term}" and load the first artist into the #artist section 
        of the DOM...`);
    const element = document.querySelector("#artist")
    element.innerHTML = ""
    fetch(baseURL + "?type=artist&q=" + term)
    .then(response=>response.json())
    .then((data)=>{
        if (data.length == 0) {
            document.querySelector("#artist").innerHTML += "No artists found that match your search criteria."
        }
        if(data.length > 0){
            const firstArtist = data[0]
            element.innerHTML += `<section class="artist-card" id="${firstArtist.id}">
            <div>
                <img src="${firstArtist.image_url}">
                <h2>${firstArtist.name}</h2>
                <div class="footer">
                    <a href="${firstArtist.spotify_url}" target="_blank">
                        view on spotify
                    </a>
                </div>
            </div>
        </section>`
        }
    })
};

const handleTrackClick = (ev) => {
    const previewUrl = ev.currentTarget.getAttribute('data-preview-track');
    console.log(previewUrl);
    audioPlayer.setAudioFile(previewUrl)
    audioPlayer.play()
    document.querySelector("#current-track").innerHTML = ev.currentTarget.innerHTML
}

document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};