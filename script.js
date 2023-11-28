// Movies search List - https://www.omdbapi.com/?s=raa&page=1&apikey=878d3a94
// Movie details - https://omdbapi.com/?i=tt4154796&apikey=878d3a94

let searchBox = document.querySelector("#movie-search");
let MovieResults = document.querySelector('.search-results')
let results = [];

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
            list = `
            <div class="movie-card">
                <img src=${movie.Poster} alt="movie-poster">
                <h2>${movie.Title}</h2>
                <div>
                    <h3>${movie.Year}</h3>
                    <input type="checkbox"></input>
                </div>
            </div>
            `
            MovieResults.innerHTML += list;
        })
    }
    

}

searchBox.addEventListener('input', async()=>{
    const searchTerm = searchBox.value.trim()
    moviesList(searchTerm)
});


