# CompareTech Analytics Platform (React Frontend)

![Performance Visualization](Animation.gif)

## 🚀 Project Vision
CompareTech is a professional-grade hardware analytics dashboard that empowers users to make data-driven decisions when selecting hardware. Built with **React** and **Vite**, it provides a high-performance interface for comparing complex technical specifications across CPUs, GPUs, Laptops, and Smartphones.

## 🛠️ Tech Stack
*   **Library:** React 18+
*   **Build Tool:** Vite
*   **Routing:** React Router 6
*   **UI Framework:** React Bootstrap
*   **Data Visualization:** Chart.js + Radar Charts
*   **Notifications:** React-Hot-Toast
*   **Animations:** Framer Motion (Page Transitions)

## 🏗️ Technical Architecture & UX Design

### 1. Advanced State Management
Implemented a **Cross-Category Selection System** using `useOutletContext`. This allows users to persist selections (e.g., choosing a CPU in the "Processors" tab) while continuing to browse other categories, culminating in a unified "Comparison View."

### 2. Data-Driven Visuals
Instead of raw numbers, I integrated **Chart.js** to visualize performance benchmarks. The "Compare" page uses **Radar Charts** to highlight the relative strengths/weaknesses of hardware side-by-side, providing immediate analytical value.

### 3. Professional UX Patterns
*   **Responsive Grid:** Fully optimized for mobile and desktop using Bootstrap's grid system.
*   **"Differences Only" Mode:** A specialized feature that toggles the visibility of identical specs, allowing users to focus exclusively on what sets products apart.
*   **URL-Persistent State:** Comparison views are driven by URL Search Parameters, making specific hardware comparisons shareable and bookmarkable.

## 📁 Repository Structure
This is the frontend component of a decoupled MERN stack architecture.
*   **Frontend Repo:** [Compare-Tech-Frontend](https://github.com/KING2MO123/Compare-Tech-Frontend)
*   **Backend Repo:** [compare-tech-backend](https://github.com/KING2MO123/compare-tech-backend)

## 🛠️ Local Installation

1. **Clone the repository.**
2. **Install dependencies:** `npm install`
3. **Connect Backend:** By default, the app looks for a local API on `http://localhost:3001`.
4. **Development Mode:** `npm run dev`

---
*Developed by KING2MO - Engineering High-Performance User Experiences.*
