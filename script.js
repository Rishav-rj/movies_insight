// Movies search List - https://www.omdbapi.com/?s=raa&page=1&apikey=878d3a94
// Movie details - https://omdbapi.com/?i=tt4154796&apikey=878d3a94

let searchBox = document.querySelector("#movie-search");
let MovieResults = document.querySelector('.search-results');
let movieDetail = document.querySelector('.movie-detail-conttainer');
let results = [];


function addToFav(id){
    // if(fav == NaN){
    //     fav = []
    // }
    // fav.push(id)
    // localStorage.setItem(fav, id)
    alert("added to Fav", id)
}

async function moviesList(searchTerm){
    const url = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=878d3a94`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response == "True"){
        results = data.Search;
    }

    if(results.length > 0){
        MovieResults.innerHTML = ""; 
        results.forEach(function(movie){
            let id = movie.imdbID;
            if(movie.Poster == "N/A"){
                movie.Poster = "moviedetailed.png"
            }
            let list = `
            <a href="movieDetailed.html?id=${id}">
                <div class="movie-card">
                    <img src=${movie.Poster} alt="movie-poster">
                    <h2>${movie.Title}</h2>
                    <div>
                        <h3>${movie.Year}</h3>
                        <div class="check">
                            <abbr title="Add to Favourite"><i class="fa-solid fa-plus" onclick="addToFav('${id}')"></i></abbr>
                        </div>
                        
                    </div>
                </div>
            </a>
            `

            MovieResults.innerHTML += list;
        })
    }
    

}


searchBox.addEventListener('input', async()=>{
    const searchTerm = searchBox.value.trim()
    moviesList(searchTerm)
});


async function movieDetailed(){
    let movieURL = new URLSearchParams(window.location.search);
    let id = movieURL.get('id');
    const res = await fetch(`https://omdbapi.com/?i=${id}&apikey=878d3a94`);
    const data = await res.json();
    console.log(data);
    if(data.Poster == "N/A"){
        data.Poster = "moviedetailed.png"
    }
    let movie = `
    <div class="movie-detail">
        <div class="movie-poster">
            <img src=${data.Poster} alt="movie_detail">
        </div>
        <div class="details">
            <h1 class="title">${data.Title}</h1>
            <p class="rating"><i class="fa-solid fa-star"></i>${data.Ratings[0].Value} </p>
            <p class="released"><b>Released : </b>${data.Released}</p>
            <p class="genre"><b>Genre : </b> ${data.Genre}</p>
            <p class="director"><b>Director : </b> ${data.Director}</p>
            <p class="writer"><b>Writer : </b>${data.Writer}</p>
            <p class="actor"><b>Actors : </b>${data.Actors}</p>
            <p class="plot">${data.Plot}</p>
        </div>
        <div class="check fac-check">
            <abbr title="Add to Favourite"><i class="fa-solid fa-plus" onclick="addToFav('${id}')"></i></abbr>
        </div>
    </div>
    `
    movieDetail.innerHTML = movie;

}

