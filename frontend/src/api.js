// Point d'accès unique à l'API backend.
// Définir VITE_API_BASE (racine, SANS /api) dans .env ou chez l'hébergeur (Vercel) :
//   VITE_API_BASE=https://compare-tech-api.onrender.com
export const API_ROOT = (import.meta.env.VITE_API_BASE || 'https://mahamoud-compare-tech-api.onrender.com').replace(/\/$/, '');
export const API_BASE = `${API_ROOT}/api`;

/*
 * Clé admin pour les routes POST / PUT / DELETE.
 *
 * ATTENTION — limite à connaître : une variable VITE_* est intégrée au bundle
 * JavaScript envoyé au navigateur. Elle n'est donc PAS secrète : quiconque
 * inspecte les sources du site peut la lire.
 *
 * Ce niveau de protection empêche les scripts automatisés et les requêtes
 * opportunistes de modifier la base — ce qui était le vrai risque ici, l'API
 * étant auparavant totalement ouverte. Il n'empêche pas quelqu'un de motivé
 * qui lit le bundle.
 *
 * Pour une protection réelle, il faudrait un login avec mot de passe côté
 * serveur (JWT) : la clé ne transiterait alors jamais dans le code client.
 * C'est l'évolution naturelle si ce projet doit gérer de vraies données.
 */
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY || '';

// En-têtes pour une requête authentifiée.
export function adminHeaders(extra = {}) {
  return ADMIN_KEY ? { ...extra, 'x-admin-key': ADMIN_KEY } : { ...extra };
}

// Wrapper pour les appels d'écriture : ajoute la clé et remonte
// un message d'erreur exploitable plutôt qu'un échec silencieux.
export async function adminFetch(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: adminHeaders(options.headers || {})
  });

  if (response.status === 401) {
    throw new Error("Non autorisé : clé admin absente ou invalide (VITE_ADMIN_KEY).");
  }
  if (response.status === 503) {
    throw new Error("Écritures désactivées côté serveur (ADMIN_KEY non configurée).");
  }
  if (response.status === 429) {
    throw new Error('Trop de requêtes. Réessaie dans quelques minutes.');
  }
  return response;
}
