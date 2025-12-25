import { API_KEY, BASE_URL } from './api.js';

// Version simple de l'authentification
export class AuthManager {
    constructor() {
        // Récupérer la session si elle existe déjà
        this.sessionId = localStorage.getItem('session_tmdb');
    }

    // Étape 1 : Demander un token à TMDB
    async demanderToken() {
        const response = await fetch(`${BASE_URL}/authentication/token/new?api_key=${API_KEY}`);
        const data = await response.json();
        
        // Sauvegarder le token temporaire
        localStorage.setItem('token_temp', data.request_token);
        return data.request_token;
    }

    // Étape 2 : Aller se connecter sur TMDB
    async seConnecter() {
        const token = await this.demanderToken();
        
        // URL de redirection corrigée pour GitHub Pages
        const baseUrl = window.location.hostname === 'localhost' 
            ? window.location.origin 
            : 'https://myriam-cyber22.github.io/Pop-N-Flix';
        
        const lienTMDB = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${baseUrl}/callback.html`;
        window.location.href = lienTMDB;
    }

    // Étape 3 : Créer la session définitive
    async creerSession() {
        const tokenTemp = localStorage.getItem('token_temp');
        
        const response = await fetch(`${BASE_URL}/authentication/session/new?api_key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ request_token: tokenTemp })
        });
        
        const data = await response.json();
        
        // Sauvegarder la session
        localStorage.setItem('session_tmdb', data.session_id);
        this.sessionId = data.session_id;
    }

    // Vérifier si connecté
    estConnecte() {
        return this.sessionId !== null;
    }

    // Déconnexion
    seDeconnecter() {
        localStorage.removeItem('session_tmdb');
        localStorage.removeItem('token_temp');
        this.sessionId = null;
    }
}
