# 🌸 Safe Pregnancy

Application de suivi de grossesse personnalisée — développée avec Next.js, Tailwind CSS et MySQL.

## ✨ Fonctionnalités

- **Authentification** — inscription, connexion, sessions JWT sécurisées
- **Dashboard personnalisé** — semaine actuelle, trimestre, jours avant la DPA
- **Suivi de santé** — poids, tension, humeur, symptômes semaine par semaine
- **Rendez-vous** — ajout, suppression, historique des RDV médicaux
- **Conseils** — conseils adaptés automatiquement à la semaine de grossesse
- **Profil** — modification des informations, changement de mot de passe, suppression du compte

## 🛠️ Stack technique

- **Frontend** — Next.js 16, React 19, Tailwind CSS v4
- **Backend** — API Routes Next.js
- **Base de données** — MySQL avec Prisma ORM
- **Authentification** — JWT (jose) + cookies httpOnly
- **Sécurité** — bcryptjs pour le hashage des mots de passe

## 📁 Structure du projet

```
safe-pregnancy/
├── prisma/
│   ├── schema.prisma        # Schéma de la base de données
│   └── migrations/          # Migrations versionnées
├── src/
│   ├── app/
│   │   ├── api/             # API Routes (back-end)
│   │   │   ├── auth/        # register, login, logout
│   │   │   ├── user/        # profil, mot de passe
│   │   │   ├── saisies/     # suivi de santé
│   │   │   └── rendez-vous/ # rendez-vous médicaux
│   │   ├── dashboard/       # Pages du tableau de bord
│   │   ├── login/           # Page connexion
│   │   └── register/        # Page inscription
│   ├── components/          # Composants React réutilisables
│   ├── data/                # Données statiques (conseils par semaine)
│   └── lib/                 # Utilitaires (Prisma client)
└── middleware.js             # Protection des routes
```

## 🚀 Installation

### Prérequis
- Node.js 18+
- MySQL (XAMPP ou autre)

### 1. Clone le projet
```bash
git clone https://github.com/RJAAY/safe-pregnancy.git
cd safe-pregnancy
```

### 2. Installe les dépendances
```bash
npm install
```

### 3. Configure les variables d'environnement
```bash
cp .env.example .env
```
Puis modifie `.env` avec tes informations de connexion MySQL.

### 4. Crée la base de données
Dans phpMyAdmin, crée une base de données nommée `safe_pregnancy`.

### 5. Lance les migrations
```bash
npx prisma migrate dev
```

### 6. Lance le projet
```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

## 👩‍💻 Auteure

Développé par **Ranya JAIDANE**
