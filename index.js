import { getTrendingMovies, IMG_URL } from './api.js';

let currentPage = 1; 

async function displayMovies(page) {
    const movies = await getTrendingMovies(page);
    const container = document.getElementById('movie-container');

    if (!movies) return;

    // Ajout de "index" pour calculer le numéro du film
    movies.forEach((movie, index) => {
        const rank = index + 1 + (page - 1) * 20;
        
        // On crée un lien <a> qui contient TOUTE la carte
        const movieLink = document.createElement('a');
        movieLink.href = `movie.html?id=${movie.id}`;

movieLink.classList.add('movie-card-link');
movieLink.innerHTML = `
    <div class="movie-card">
        <div class="rank-number">${rank}</div>
        <img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}">
        <div class="movie-info-bottom">
            <h3>${movie.title}</h3>
            <p>Sortie : ${movie.release_date}</p>
        </div>
    </div>
`;
        container.appendChild(movieLink);
    });
}

// Premier chargement
displayMovies(currentPage);

// Gestion du bouton "Charger plus"
const loadMoreBtn = document.getElementById('load-more');
loadMoreBtn.addEventListener('click', () => {
    currentPage++; 
    displayMovies(currentPage); 
});
// TEST AUTH - ajoute ça à la fin de index.js
import { AuthManager } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const authManager = new AuthManager();
    const btnConnexion = document.getElementById('btn-connexion');
    
    if (btnConnexion) {
        btnConnexion.addEventListener('click', () => {
            console.log('Tentative de connexion...');
            authManager.seConnecter();
        });
    }

});
// AJOUTER ÇA À LA FIN de index.js
import { AuthManager } from './auth.js';

// Gestion des boutons connexion/déconnexion
document.addEventListener('DOMContentLoaded', () => {
    const authManager = new AuthManager();
    const btnConnexion = document.getElementById('btn-connexion');
    
    // Si connecté, changer le texte du bouton
    if (authManager.estConnecte()) {
        btnConnexion.textContent = 'Se déconnecter';
        btnConnexion.onclick = () => {
            authManager.seDeconnecter();
            alert('Déconnecté !');
            location.reload();
        };
    } else {
        btnConnexion.textContent = 'Se connecter';
        btnConnexion.onclick = () => authManager.seConnecter();
    }
});
