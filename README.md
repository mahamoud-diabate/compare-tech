# Compare-Tech

Comparateur d'appareils technologiques (CPU, GPU, portables, téléphones) avec **verdict généré par IA**.

Monorepo réunissant le backend et le frontend dans un seul dépôt, avec l'historique Git complet des deux projets.

## Structure

```
compare-tech/
├── backend/    → API REST (Node.js · Express · MongoDB · JWT · Gemini)
└── frontend/   → Interface web (React · Vite)
```

## Backend

```bash
cd backend
npm install
cp .env.example .env   # renseigner DB_URI, ADMIN_PASSWORD, JWT_SECRET, GEMINI_API_KEY
npm start              # http://localhost:3001
```

Routes principales : `GET /api/cpus`, `/api/gpus`, `/api/laptops`, `/api/telephones`, `/api/featured`, `POST /api/ai/verdict`, `POST /api/auth/login`.

## Frontend

```bash
cd frontend
npm install
npm run dev            # http://localhost:5173
```

Le frontend pointe vers l'API via la variable `VITE_API_BASE` (par défaut : l'API déployée sur Render).

## Déploiement

- **Backend** → Render (configuration dans `backend/render.yaml`)
- **Frontend** → Vercel (configuration dans `frontend/vercel.json`)

## Auteur

Mahamoud Diabaté — [github.com/mahamoud-diabate](https://github.com/mahamoud-diabate)
