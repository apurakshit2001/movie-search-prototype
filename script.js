import { config } from './config.js'; 
const apiKey = config.apiKey;

const searchBtn = document.getElementById('searchBtn');
const movieTitleInput = document.getElementById('movieTitle');
const resultDiv = document.getElementById('result');
const paginationDiv = document.getElementById('pagination');

searchBtn.addEventListener('click', () => {
    const movieTitle = movieTitleInput.value;
    if (movieTitle) {
        fetchMovies(movieTitle, 1);  // Start with page 1
    } else {
        resultDiv.innerHTML = '<p>Please enter a movie title.</p>';
    }
});

function fetchMovies(title, page) {
    fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(title)}&page=${page}&apikey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        if (data.Response === "True") {
            displayMovies(data.Search);
            setupPagination(title, data.totalResults, page);
        } else {
            resultDiv.innerHTML = `<p>${data.Error}</p>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = `<p>Something went wrong!</p>`;
    });
}

function displayMovies(movies) {
    resultDiv.innerHTML = movies.map(movie => `
        <div class="movie-item">
            <img src="${movie.Poster}" alt="${movie.Title}" class="movie-poster" />
            <h3>${movie.Title} (${movie.Year})</h3>
            <button onclick="viewMovie('${movie.imdbID}')">View Details</button>
        </div>
    `).join('');
}

function setupPagination(title, totalResults, currentPage) {
    const totalPages = Math.ceil(totalResults / 10);
    paginationDiv.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        if (i === currentPage) {
            pageBtn.disabled = true;
        }
        pageBtn.addEventListener('click', () => fetchMovies(title, i));
        paginationDiv.appendChild(pageBtn);
    }
}

window.viewMovie = function(imdbID) {
    // Redirect to movie.html with the IMDb ID as a query parameter
    window.location.href = `movie.html?id=${imdbID}`;
};
