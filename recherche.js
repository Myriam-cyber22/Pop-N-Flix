import { API_KEY, BASE_URL, IMG_URL } from './api.js';

const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('search-results');

searchInput.addEventListener('input', async (e) => {
    const query = e.target.value.trim();

    if (query.length > 2) {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=fr-FR`);
        const data = await response.json();
        
        displayMovies(data.results);
    } else {
        resultsContainer.innerHTML = ""; 
    }
});

function displayMovies(movies) {
    resultsContainer.innerHTML = ""; // On vide l'écran
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <a href="movie.html?id=${movie.id}">En savoir plus</a>
        `;
        resultsContainer.appendChild(card);
    });
}