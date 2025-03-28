# Clone Twitter

Un clone simplifié de Twitter créé avec React et Bootstrap pour le frontend et Laravel pour le backend.

## Table des matières

- [Introduction](#introduction)
- [Fonctionnalités](#fonctionnalités)
- [Prérequis](#prérequis)
- [Installation et configuration](#installation-et-configuration)
- [Structure du projet](#structure-du-projet)
- [Fonctionnalités principales](#fonctionnalités-principales)
- [Points d'accès API](#points-daccès-api)
- [Déploiement](#déploiement)
- [Améliorations futures](#améliorations-futures)
- [Contributeurs](#contributeurs)


## Introduction

Ce projet est une réplique simplifiée de Twitter, créée avec React et Bootstrap pour le frontend et Laravel pour le backend. Il permet aux utilisateurs de :
- S'inscrire et se connecter
- Publier et aimer des tweets
- Suivre d'autres utilisateurs
- Voir un fil d'actualité personnalisé

## Fonctionnalités

### Authentification
- Création d'un compte
- Connexion/déconnexion

### Gestion de profil
- Modification des informations de profil
- Personnalisation des détails du profil

### Interaction entre utilisateurs
- Recherche d'utilisateurs avec `@`
- Suivre/ne plus suivre d'autres utilisateurs

### Création et interaction avec le contenu
- Publier des posts
- Reposter du contenu
- Sauvegarder des posts
- Aimer des posts

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés :

### Exigences générales
- **Git** : `sudo apt update && sudo apt install git`
- **Node.js et npm** : `sudo apt install nodejs npm`
- **Composer** : `sudo apt install composer`
- **MySQL** : `sudo apt install mysql-server`

### Exigences spécifiques au projet
- **Laravel** : `composer global require laravel/installer`
- **React** : `npm install -g create-react-app`

## Installation et configuration

### 1. Cloner le dépôt
```
git clone https://github.com/votre-nom/twitter-clone.git
cd twitter-clone
```

### 2. Configuration du backend (Laravel)
```
cd project-laravel
composer install
cp .env.example .env
php artisan key:generate
```
Configurer la base de données dans `.env` :
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=commondatabase
DB_USERNAME=root
DB_PASSWORD=votre_mot_de_passe
```
🚨SESSION_DRIVER=file # de base c'est database faut le changer en file 🚨

```
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=noreplytwiter16@gmail.com
MAIL_PASSWORD=guxozpixxncvbjwn
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreplytwiter16@gmail.com
MAIL_FROM_NAME="App RMAJ"
```
Puis, lancer les migrations :
```
php artisan migrate
php artisan serve
```

### 3. Configuration du frontend (React)
```
cd ../mon-projet-react
npm install
npm install bootstrap react-router-dom axios
```
Importer Bootstrap dans `src/index.js` :
```js
import 'bootstrap/dist/css/bootstrap.min.css';
```
Démarrer le serveur React :
```
npm start
```

## Structure du projet

```
/twitter-clone
├── /project-laravel         # Backend Laravel
│   ├── app/                 # Code de l'application
│   ├── database/            # Migrations et seeds
│   ├── routes/              # Définition des routes API
│   ├── .env                 # Variables d'environnement
│   ├── composer.json        # Dépendances PHP
├── /mon-projet-react        # Frontend React
│   ├── src/
│   │   ├── components/      # Composants React
│   │   ├── pages/           # Pages principales
│   │   ├── App.js
│   │   └── index.js
└── README.md
```

## Fonctionnalités principales

### 1. Authentification des utilisateurs
- Laravel Sanctum pour l'authentification par token
- Stockage du token dans localStorage

### 2. Gestion du profil utilisateur
- API pour modification du profil
- Upload d'avatar

### 3. Recherche d'utilisateurs et suivi
- API pour recherche par nom d'utilisateur
- Système de follow/unfollow

### 4. Gestion des posts
- API pour création et affichage des posts
- Composant de timeline

### 5. Interactions avec les posts
- API pour like, repost et sauvegarde

## Points d'accès API

### Authentification
- `POST /api/register` - Création d'un compte
- `POST /api/login` - Connexion
- `POST /api/logout` - Déconnexion

### Gestion des utilisateurs
- `GET /api/users/{id}` - Profil utilisateur
- `PUT /api/users/{id}` - Modification du profil

### Système de suivi
- `POST /api/users/{id}/follow` - Suivre
- `DELETE /api/users/{id}/follow` - Ne plus suivre

### Posts
- `GET /api/posts` - Fil d'actualité
- `POST /api/posts` - Publier un post
- `DELETE /api/posts/{id}` - Supprimer un post

### Interactions
- `POST /api/posts/{id}/like` - Aimer un post
- `POST /api/posts/{id}/repost` - Reposter

## Déploiement

### Backend (Laravel)
- Configurer Apache/Nginx
- Exécuter : `php artisan migrate --seed`

### Frontend (React)
- Construire pour la production : `npm run build`
- Hébergement via Netlify/Vercel

## Améliorations futures
- Notifications en temps réel avec WebSockets
- Messagerie directe
- Hashtags et tendances
- Upload de médias

## Contributeurs
- Rigel
- Merveille
-Johnatan
-Ahmad


