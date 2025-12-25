import { getMovieDetails, getMovieReviews, IMG_URL } from './api.js';

// Récupérer l'ID du film depuis l'URL (?id=550)
function getMovieIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Afficher les détails du film
async function displayMovieDetails(movieId) {
    const movie = await getMovieDetails(movieId);
    
    if (!movie) {
        document.getElementById('movie-details').innerHTML = '<p>Film non trouvé</p>';
        return;
    }

    const movieDetailsContainer = document.getElementById('movie-details');
    movieDetailsContainer.innerHTML = `
        <div class="movie-hero">
            <img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}" class="details-poster">
            <div class="details-text">
                <h1>${movie.title}</h1>
                <p class="tagline">${movie.tagline || ''}</p>
                <p><strong>Date de sortie :</strong> ${movie.release_date}</p>
                <p><strong>Durée :</strong> ${movie.runtime} minutes</p>
                <p><strong>Note :</strong> ${movie.vote_average}/10</p>
                <div class="overview">
                    <h3>Résumé :</h3>
                    <p>${movie.overview}</p>
                </div>
            </div>
        </div>
    `;
}

// Afficher les commentaires
async function displayReviews(movieId) {
    const reviews = await getMovieReviews(movieId);
    const commentsContainer = document.getElementById('comments-container');

    if (!reviews || reviews.length === 0) {
        commentsContainer.innerHTML = '<p>Aucun commentaire disponible</p>';
        return;
    }

    commentsContainer.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <img src="https://www.themoviedb.org/t/p/w45${review.author_details?.avatar_path || '/default-avatar.png'}" 
                     alt="${review.author}" class="reviewer-avatar">
                <div class="reviewer-info">
                    <strong>${review.author}</strong>
                    <div class="review-date">${new Date(review.created_at).toLocaleDateString('fr-FR')}</div>
                </div>
            </div>
            <div class="review-content">
                ${review.content.length > 500 ? review.content.substring(0, 500) + '...' : review.content}
            </div>
        </div>
    `).join('');
}

// Démarrage quand la page se charge
document.addEventListener('DOMContentLoaded', () => {
    const movieId = getMovieIdFromURL();
    
    if (movieId) {
        displayMovieDetails(movieId);
        displayReviews(movieId);
    } else {
        document.getElementById('movie-details').innerHTML = '<p>Aucun film sélectionné</p>';
    }
});