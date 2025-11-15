#API Backend pour KING2MO COMPARE TECH

Il s'agit du serveur backend (API Restful) pour le projet CompareTech. Il est construit avec Node.js, Express, et MongoDB.

#Liens
* **Site en direct (Frontend):**`https://compare-tech-frontend-git-main-king2mos-projects.vercel.app/`
* **API en direct (Ce service):**`https://mahamoud-compare-tech-api.onrender.com`
* **Code du Frontend (React):**`https://github.com/KING2MO123/Compare-Tech-Frontend`

## Fonctionnalites Cles

* **Architecture MERN:** Serveur Node.js decouple du frontend React.
* **Multi-Modeles:**Gere 4 collections de donnees distinctes (Cpus, Gpu, Laptops, Telephones) avec des modeles mongoose.
* **API Restful complete:**Implemente des routes `GET`(tous et par ID), `POST`(un seul ou plusieurs), et `POST`(comparaison) pour chaque categorie.
* **Gestion des donnees:** Utilise Mongoose pour la modelisation et la communication avec une base de donnees MongoDB Atlas.
* **Deploiement:**Heberge sur Render et connecte a une base de donnees cloud.

## Routes Principales de l'API

| Méthode | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/api/cpus` | Récupère la liste de tous les CPUs. |
| `GET` | `/api/cpus/:id` | Récupère un seul CPU par son ID. |
| `POST`| `/api/cpus/compare`| Récupère une liste de CPUs par leurs IDs. |
| `GET` | `/api/gpus` | Récupère la liste de tous les GPUs. |
| `GET` | `/api/gpus/:id` | Récupère un seul GPU par son ID. |
| `GET` | `/api/laptops` | Récupère la liste de tous les Laptops. |
| `GET` | `/api/laptops/:id`| Récupère un seul Laptop par son ID. |
| `GET` | `/api/telephones` | Récupère la liste de tous les Téléphones. |
| `GET` | `/api/telephones/:id`| Récupère un seul Téléphone par son ID. |

## Variables d'Environnement

Pour lancer ce projet, vous aurez besoin de définir la variable d'environnement suivante :

`DB_URI`:`https://cloud.mongodb.com/v2/6906305844d8e15fcd768213#/overview?connectCluster=KING2MOCOMPARETECHCLUSTER`