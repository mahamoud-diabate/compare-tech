// Point d'accès unique à l'API backend.
// Définir VITE_API_BASE (racine, SANS /api) dans .env ou chez l'hébergeur (Vercel) :
//   VITE_API_BASE=https://compare-tech-api.onrender.com
// Par défaut, pointe vers l'ancienne URL Render (à remplacer lors du redéploiement).
export const API_ROOT = (import.meta.env.VITE_API_BASE || 'https://mahamoud-compare-tech-api.onrender.com').replace(/\/$/, '');
export const API_BASE = `${API_ROOT}/api`;
