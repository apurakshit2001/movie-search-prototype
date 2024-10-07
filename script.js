import { config } from './config.js'; 
const apiKey = config.apiKey; 

const searchBtn = document.getElementById('searchBtn');
const movieTitleInput = document.getElementById('movieTitle');
const resultDiv = document.getElementById('result');

searchBtn.addEventListener('click', () => {
    const movieTitle = movieTitleInput.value;
    console.log("Movie Title:", movieTitle);

    if (movieTitle) {
        fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`)
        .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    displayMovie(data);
                } else {
                    resultDiv.innerHTML = `<p>${data.Error}</p>`;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                resultDiv.innerHTML = `<p>Something went wrong!</p>`;
            });
    } else {
        resultDiv.innerHTML = '<p>Please enter a movie title.</p>';
    }
});

function displayMovie(movie) {
    resultDiv.innerHTML = `
        <h2>${movie.Title} (${movie.Year})</h2>
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
                <td><strong>Plot:</strong></td>
                <td>${movie.Plot}</td>
            </tr>
        </table>
    `;
}

