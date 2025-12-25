export const API_KEY = '8de3ed7ddbca4b11759d20996dba1808';
export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMG_URL = 'https://image.tmdb.org/t/p/w500';

export async function getTrendingMovies(page = 1) {
    try {
        const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=fr-FR&page=${page}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Erreur lors de la récupération des tendances:", error);
    }
}

// Fonction 1 : Recherche de films
export async function searchMovies(query, page = 1) {
    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=fr-FR&page=${page}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Erreur recherche:", error);
        return [];
    }
}

// Fonction 2 : Détails du film
export async function getMovieDetails(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr-FR`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur détails film:", error);
        return null;
    }
}

// Fonction 3 : Commentaires du film
export async function getMovieReviews(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=fr-FR`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Erreur commentaires:", error);
        return [];
    }
}