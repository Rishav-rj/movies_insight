// Movies search List - https://www.omdbapi.com/?s=raa&page=1&apikey=878d3a94
// Movie details - https://omdbapi.com/?i=tt4154796&apikey=878d3a94

let searchBox = document.querySelector("#movie-search");
let MovieResults = document.querySelector('.search-results');
let movieDetail = document.querySelector('.movie-detail-container');
let favMovie = document.querySelector('.fav-container');
let results = [];
let favList = JSON.parse(localStorage.getItem("fav"));



function addToFav(id){
    if(favList == null){
        favList = []
    }
    favList.push(id)
    localStorage.setItem("fav", JSON.stringify(favList));
    alert("added to Fav")
}

function deleteFav(id){
    favList = favList.filter((ele)=>{
        return ele != id
    })
    localStorage.setItem("fav", JSON.stringify(favList));
    alert(`Movie Removed`);
    window.location.replace('fav.html');
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
            <div class="movie-card">
                <a href="movieDetailed.html?id=${id}">
                    <img src=${movie.Poster} alt="movie-poster">
                </a>
                    <h2>${movie.Title}</h2>
                
                    <div>
                        <h3>${movie.Year}</h3>
                        <div class="check">
                            <abbr title="Add to Favourite"><i class="fa-solid fa-plus" onclick="addToFav('${id}')"></i></abbr>
                        </div>
                        
                    </div>
                </div>
            `

            MovieResults.innerHTML += list;
        })
    }
    

}

if(searchBox != null){
    searchBox.addEventListener('input', async()=>{
        const searchTerm = searchBox.value.trim()
        moviesList(searchTerm)
    });
}



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


function favMovies(){
    if(favList == null || favList.length == 0){
        return
    }
    favList.forEach(async function(id){
        let movieURL = `https://omdbapi.com/?i=${id}&apikey=878d3a94`;
        let movieList = await fetch(movieURL);
        let movieObj = await movieList.json();
        if(movieObj.Poster == "N/A"){
            movieObj.Poster = "moviedetailed.png"
        }
        let favmovie = `
        <div class="movie-card">
            <a href="movieDetailed.html?id=${id}">
                <img src=${movieObj.Poster} alt="movie-poster">
            </a>
                <h2>${movieObj.Title}</h2>
            
                <div>
                    <h3>${movieObj.Year}</h3>
                    <div class="check">
                        <abbr title="Delete Movie"><i class="fa-solid fa-trash-can" style="color: #fd3f3f;" onclick="deleteFav('${id}')"></i></abbr>
                    </div>
                    
                </div>
            </div>
        `

        favMovie.innerHTML += favmovie;
    })
}
