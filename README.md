# Troov Test Technique - Application Web

Ce projet est une application full-stack développée pour le test technique de Troov. L'application permet la gestion des objets des utilisateurs via une interface simple avec des fonctionnalités CRUD sécurisées.

## Fonctionnalités

- **Authentification utilisateur** :  
  - Inscription  
  - Connexion  
  - Gestion des tokens JWT  

- **Gestion des Objets** :  
  - Ajouter un objet  
  - Lister les objets  
  - Modifier / Supprimer des objets  

- **Sécurité** :  
  - Protection des routes via JWT  
  - Validation des champs  

## Technologies Utilisées

- **Frontend** : Nuxt 3 (Vue.js)  
- **Backend** : Express.js (Node.js)  
- **Base de données** : MongoDB (Mongoose)  
- **UI/UX** : Tailwind CSS  
- **State Management** : Pinia  
- **Sécurité** : bcryptjs, JWT  
- **Tests** : Jest  

---

## Installation et Démarrage

### 1. Cloner le Repo

```bash
git clone https://github.com/crash1920/troov-test.git
cd troov-test
```

---

### 2. Backend - API (Node.js / Express)

#### 📁 Configurer l'Environnement (`backend/.env`)

```env
MONGO_URI=mongodb+srv://chriguineder:ZAiKkB8OoYW4DYUc@cluster0.jgmas.mongodb.net/troov-test
PORT=5000
JWT_SECRET=mysecretkey
```

#### 📦 Installer les Dépendances du Backend

```bash
cd backend
npm install
```

#### 🚀 Lancer le Serveur Backend

```bash
npm run dev
```

L'API est accessible sur : `http://localhost:5000/api`

---

### 3. Frontend - Interface Utilisateur (Nuxt 3)

#### 📁 Configurer l'API (`nuxt.config.ts`)

Le frontend interagit avec l'API via la configuration suivante :  

```javascript
runtimeConfig: {
  public: {
    apiBase: 'http://localhost:5000/api'  // L'URL de ton backend
  }
}
```

#### 📦 Installer les Dépendances Frontend

```bash
cd frontend
npm install
```

#### 🚀 Lancer le Frontend

```bash
npm run dev
```

L'interface utilisateur est accessible sur : `http://localhost:3000`

---

## Structure du Projet

```
troov-test/
│
├── backend/                 # API Express.js
│   ├── controllers/         # Logique Métier (CRUD, Auth)
│   ├── middlewares/         # JWT Middleware
│   ├── models/              # Modèles MongoDB (User, Object)
│   ├── routes/              # Routes API
│   └── server.js            # Point d'entrée Backend
│
├── frontend/                # Nuxt.js (Vue 3)
│   ├── components/          # Composants Vue.js
│   ├── pages/               # Pages (Login, Signup, Objects)
│   ├── stores/              # Gestion de l'état (Pinia)
│   ├── assets/              # Fichiers CSS (Tailwind)
│   └── nuxt.config.js       # Configuration Nuxt
│
├── README.md                # Ce fichier
└── .env                     # Variables d'environnement
```

---

## Points Clés

- **Authentification** :  
  - JWT utilisé pour sécuriser les routes (ex : `/api/objects`)  
  - Stockage du token dans `localStorage` côté frontend  

- **CRUD** :  
  - Gestion des objets utilisateur (ajout, modification, suppression)  
  - Route protégée avec middleware JWT  

- **UI Moderne** :  
  - Design responsive avec Tailwind CSS  
  - Interface simple et épurée pour maximiser l'expérience utilisateur  

---
