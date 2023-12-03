# movies_insight
This project is a simple web application for searching and exploring movie details. It uses the OMDB API to fetch movie data and provides features such as searching for movies, viewing detailed information about a movie, and managing a list of favorite movies.

## HTML Structure
- Two HTML files: index.html for the main search and detailed view, and fav.html for the favorites page.
- External CSS file: style.css.
- External JavaScript file: script.js.



## Colors Variables
- light
- primary
- secondary
- dark

## Styles
**Navbar Section**
- Responsive navigation bar with a logo, search bar, and favorites link.
  
**Search Results Section**
- Displays search results in a responsive grid of movie cards.
- Loading animation while fetching results.
  
**Movie Cards**
- Stylish movie cards with details like title, year, and an option to add to favorites.
  
**Movie Detailed Page**
- Detailed view of a movie including title, poster, ratings, released date, genre, director, writer, actors, and plot.
- Option to add the movie to favorites.
  
**Favourite Page**
- Displays a list of favorite movies with options to view details and remove from favorites.
  
**Fact Section**
- Displays interesting movie facts with images.
  
**Scroll Bar**
- Customized scrollbar styles.
  
**Responsive Code**
- Responsive design for tablet and mobile screens.

## JavaScript
### Functions

**movieFact():** Displays a random movie fact.

**addToFav(id):** Adds a movie to the favorites list using local storage.

**deleteFav(id):** Removes a movie from the favorites list.

**moviesList(searchTerm):** Fetches and displays search results.

**movieDetailed():** Fetches and displays details of a specific movie.

**favMovies():** Displays favorite movies.

### Event Listeners
  
Listens for input in the search box and triggers the moviesList function.
Various event listeners for adding and removing movies from favorites.
Note: The project utilizes the OMDB API for fetching movie data, and the API key is included in the script. Please make sure to handle API keys securely in a production environment.

***Note:** The project utilizes the OMDB API for fetching movie data, and the API key is included in the script.*
