import { config } from './config.js'; 
const apiKey = config.apiKey;

const urlParams = new URLSearchParams(window.location.search);
const movieID = urlParams.get('id');

const movieTitleElement = document.getElementById('movieTitle');
const movieDetailsDiv = document.getElementById('movieDetails');

if (movieID) {
    fetchMovieDetails(movieID);
}

function fetchMovieDetails(id) {
    fetch(`https://www.omdbapi.com/?i=${encodeURIComponent(id)}&apikey=${apiKey}`)
    .then(response => response.json())
    .then(movie => {
        if (movie.Response === "True") {
            displayMovieDetails(movie);
        } else {
            movieDetailsDiv.innerHTML = `<p>${movie.Error}</p>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        movieDetailsDiv.innerHTML = `<p>Something went wrong!</p>`;
    });
}

function displayMovieDetails(movie) {
    movieTitleElement.textContent = `${movie.Title} (${movie.Year})`;
    movieDetailsDiv.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title} Poster" class="movie-poster" />
        <table class="movie-details">
            <tr>
                <td><strong>Genre:</strong></td>
                <td>${movie.Genre}</td>
            </tr>
            <tr>
                <td><strong>Director:</strong></td>
                <td>${movie.Director}</td>
            </tr>
            <tr>
                <td><strong>Writer:</strong></td>
                <td>${movie.Writer}</td>
            </tr>
            <tr>
                <td><strong>Actors:</strong></td>
                <td>${movie.Actors}</td>
            </tr>
            <tr>
                <td><strong>Plot:</strong></td>
                <td>${movie.Plot}</td>
            </tr>
            <tr>
                <td><strong>Language:</strong></td>
                <td>${movie.Language}</td>
            </tr>
            <tr>
                <td><strong>Country:</strong></td>
                <td>${movie.Country}</td>
            </tr>
            <tr>
                <td><strong>Awards:</strong></td>
                <td>${movie.Awards}</td>
            </tr>
            <tr>
                <td><strong>IMDB Rating:</strong></td>
                <td>${movie.imdbRating}/10 (${movie.imdbVotes} votes)</td>
            </tr>
            <tr>
                <td><strong>Metascore:</strong></td>
                <td>${movie.Metascore}/100</td>
            </tr>
            <tr>
                <td><strong>Box Office:</strong></td>
                <td>${movie.BoxOffice}</td>
            </tr>
            <tr>
                <td><strong>Ratings:</strong></td>
                <td>
                    <ul>
                        ${movie.Ratings.map(rating => `<li>${rating.Source}: ${rating.Value}</li>`).join('')}
                    </ul>
                </td>
            </tr>
        </table>
    `;
}
