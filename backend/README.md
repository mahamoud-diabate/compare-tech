# CompareTech Analytics API (MERN Backend)

## 🚀 Overview
This is a high-performance RESTful API built to power the **CompareTech** hardware analytics platform. It manages a complex dataset of CPUs, GPUs, Laptops, and Smartphones, serving as the bridge between a MongoDB Atlas cloud database and a React-based frontend.

## 🛠️ Technical Stack
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB Atlas (NoSQL)
*   **ODM:** Mongoose
*   **Environment Management:** Dotenv
*   **Data Acquisition:** Axios + Cheerio (Web Scraping)

## 🏗️ Key Engineering Achievements

### 1. Automated Data Engineering (Scraping)
To move beyond static data, I implemented custom web scraping scripts to maintain a library of **400+ high-fidelity products**.
*   **Challenges Overcome:** Managed dynamic HTML structures and bypassed bot detection (403 Forbidden) by implementing custom HTTP header rotations and User-Agent spoofing.
*   **Scrapers:**
    *   `scrapeCpus.js`: Extracts technical specs from *Notebookcheck*.
    *   `scrapeGpus.js`: Parses massive hardware tables from *Wikipedia*.

### 2. Scalable Schema Design
Designed a multi-model architecture where each hardware category (CPU, GPU, etc.) has its own schema validation while maintaining a consistent API response structure for the frontend's consumption.

### 3. Security & Best Practices
*   Implemented **Environment Variable isolation** using `.env` to secure database credentials.
*   Decoupled architecture for independent scaling of Frontend and Backend services.
*   Centralized error handling for API reliability.

## 🔌 API Architecture

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/cpus` | Retrieve all CPU records |
| `GET` | `/api/gpus` | Retrieve all GPU records |
| `POST`| `/api/compare` | Bulk-fetch records by ID array for comparison views |
| `GET` | `/api/featured` | Aggregates top-performing hardware across models |

## 🛠️ Local Setup & Deployment

1. **Clone the repo.**
2. **Installation:** `npm install`
3. **Environment:** Create a `.env` file:
    ```env
    DB_URI=your_mongodb_atlas_uri
    PORT=3001
    ```
4. **Seed Database:** Run `node scripts/populateRemaining.js` to initialize the library.
5. **Start:** `npm start`

---
*Developed by KING2MO - Focus on Scalability, Data Integrity, and API Performance.*
