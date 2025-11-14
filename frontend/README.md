# Antoka Frontend 🏛️

> Plateforme de documents légaux intelligente pour Madagascar

Interface utilisateur moderne pour la génération automatique de documents légaux conformes au droit malgache, propulsée par l'IA et la blockchain.

![Antoka Logo](./public/antoka-logo.jpg)

---

## 📋 Table des matières

- [À propos](#à-propos)
- [Technologies](#technologies)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Scripts disponibles](#scripts-disponibles)
- [Structure du projet](#structure-du-projet)
- [Design System](#design-system)
- [Fonctionnalités](#fonctionnalités)
- [Contribuer](#contribuer)
- [License](#license)

---

## 🎯 À propos

Antoka est une plateforme décentralisée qui démocratise l'accès aux documents légaux à Madagascar en combinant :
- **IA générative** (Gemini API) pour créer des contrats conformes
- **Blockchain** (Hedera) pour garantir l'authenticité
- **Analyse intelligente** pour détecter les clauses abusives

Ce repository contient l'interface frontend, construite avec les technologies web les plus modernes.

---

## 🛠️ Technologies

### Core
- **React 18.3** - Librairie UI
- **TypeScript 5.6** - Typage statique
- **Vite 6** - Build tool ultra-rapide

### UI & Styling
- **Shadcn UI** - Composants accessibles et personnalisables
- **Tailwind CSS v4** - Framework CSS utility-first
- **Radix UI** - Primitives UI headless
- **Lucide React** - Icônes modernes

### State & Forms
- **React Hook Form** - Gestion de formulaires performante
- **Zod** - Validation de schémas TypeScript
- **Zustand** - State management léger

### Routing & HTTP
- **React Router v7** - Navigation client-side
- **Axios** - Client HTTP avec intercepteurs

---

## 📦 Prérequis

- **Node.js** >= 18.x
- **npm** >= 9.x ou **pnpm** >= 8.x
- **Git**

---

## 🚀 Installation

### 1. Cloner le repository

```
git clone https://github.com/votre-org/antoka-plateform.git
cd antoka-plateform/frontend
```

### 2. Installer les dépendances

```
npm install
```

### 3. Configurer les variables d'environnement

Créer un fichier `.env` à la racine :

```
# API Backend
VITE_API_URL=http://localhost:3001
VITE_API_TIMEOUT=30000

# Supabase (Auth)
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-cle-publique

# App
VITE_APP_NAME=Antoka
VITE_APP_VERSION=1.0.0
```

### 4. Lancer le serveur de développement

```
npm run dev
```

Ouvrir [http://localhost:5173](http://localhost:5173)

---

## ⚙️ Configuration

### Tailwind CSS

Les couleurs de la marque Antoka sont définies dans `src/App.css` :

```
:root {
  /* Navy (#0A2342) */
  --primary: oklch(0.15 0.05 245);
  
  /* Teal (#0D8A8D) */
  --secondary: oklch(0.45 0.08 190);
}
```

### Shadcn UI

Configuration dans `components.json` :

```
{
  "style": "default",
  "tailwind": {
    "baseColor": "zinc",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

---

## 📜 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de dev (port 5173) |
| `npm run build` | Build de production dans `/dist` |
| `npm run preview` | Prévisualise le build de prod |
| `npm run lint` | Lint avec ESLint |
| `npm run type-check` | Vérification TypeScript |

---

## 📁 Structure du projet

```
frontend/
├── public/
│   └── antoka-logo.jpg          # Logo de la marque
├── src/
│   ├── components/              # Composants réutilisables
│   │   ├── ui/                  # Composants Shadcn UI
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   ├── layout/              # Layout (Header, Footer)
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   └── forms/               # Formulaires métier
│   │       ├── LoginForm.tsx
│   │       ├── SignupForm.tsx
│   │       └── DocumentForm.tsx
│   ├── pages/                   # Pages de l'app
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx
│   │   │   └── SignupPage.tsx
│   │   ├── documents/
│   │   │   ├── DocumentListPage.tsx
│   │   │   ├── DocumentCreatePage.tsx
│   │   │   └── DocumentDetailPage.tsx
│   │   └── HomePage.tsx
│   ├── services/                # API calls
│   │   ├── api.ts               # Config Axios
│   │   ├── auth.service.ts      # Auth endpoints
│   │   └── document.service.ts  # Document endpoints
│   ├── hooks/                   # Custom hooks
│   │   ├── useAuth.ts
│   │   └── useDocuments.ts
│   ├── types/                   # Types TypeScript
│   │   └── index.ts
│   ├── lib/                     # Utils
│   │   └── utils.ts
│   ├── App.tsx                  # Composant racine
│   ├── App.css                  # Styles globaux + theme
│   └── main.tsx                 # Point d'entrée
├── .env                         # Variables d'environnement
├── components.json              # Config Shadcn UI
├── tailwind.config.js           # Config Tailwind
├── tsconfig.json                # Config TypeScript
├── vite.config.ts               # Config Vite
└── package.json
```

---

## 🎨 Design System

### Palette de couleurs Antoka

| Couleur | Hex | Usage |
|---------|-----|-------|
| **Navy** | `#0A2342` | Couleur primaire (boutons, titres) |
| **Teal** | `#0D8A8D` | Couleur secondaire (accents) |
| Blanc | `#FFFFFF` | Backgrounds |
| Gris 500 | `#6B7280` | Texte secondaire |

### Typographie

- **Titres** : Poppins (Google Fonts)
- **Corps** : Inter (Google Fonts)

### Composants disponibles

```
# Ajouter un composant Shadcn
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add form
npx shadcn@latest add dialog
```

---

## ✨ Fonctionnalités

### Actuellement implémentées
- ✅ Authentification (Login/Signup)
- ✅ Interface de génération de documents
- ✅ Design system Antoka
- ✅ Dark mode

### En développement
- 🚧 Tableau de bord utilisateur
- 🚧 Édition collaborative
- 🚧 Analyse de clauses abusives
- 🚧 Signature numérique
- 🚧 Mode offline (PWA)

---

## 🤝 Contribuer

### 1. Fork le projet

### 2. Créer une branche

```
git checkout -b feature/ma-fonctionnalite
```

### 3. Commit avec convention

```
feat: ajoute le composant DocumentCard
fix: corrige le bug d'affichage du header
docs: met à jour le README
style: formate le code avec prettier
refactor: restructure le dossier services
```

### 4. Push et créer une Pull Request

```
git push origin feature/ma-fonctionnalite
```

---

## 📝 API Documentation

### Endpoints Backend

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/login` | POST | Connexion utilisateur |
| `/auth/signup` | POST | Inscription |
| `/auth/logout` | POST | Déconnexion |
| `/documents` | GET | Liste documents |
| `/documents` | POST | Créer document |
| `/documents/:id` | GET | Détail document |
| `/documents/:id/analyze` | POST | Analyser clauses |

### Exemple requête

```
import axios from 'axios';

const response = await axios.post('/documents', {
  type: 'contrat_location',
  lang: 'fr',
  parties: [
    { role: 'bailleur', nom: 'Jean Dupont' },
    { role: 'locataire', nom: 'Marie Rabe' }
  ],
  clauses: ['durée: 12 mois', 'loyer: 500000 MGA']
});
```

---

## 🐛 Debugging

### Logs de développement

Les logs sont activés automatiquement en mode dev. Pour ajuster :

```
// src/services/api.ts
api.interceptors.request.use((config) => {
  console.log('API Request:', config.method, config.url);
  return config;
});
```

### React DevTools

Installer l'extension Chrome/Firefox pour inspecter les composants.

---

## 📊 Performance

### Lighthouse Score cibles

- Performance : > 90
- Accessibility : > 95
- Best Practices : > 90
- SEO : > 85

### Optimisations actuelles

- Code splitting avec React.lazy()
- Tree shaking automatique (Vite)
- CSS purgé en prod (Tailwind)
- Images optimisées

---

## 🔒 Sécurité

- HTTPS obligatoire en production
- CORS configuré strictement
- JWT avec expiration courte
- XSS protection (React par défaut)
- CSRF protection via tokens

---

## 📄 License

MIT © 2025 Antoka

---

## 👥 Équipe

- **Development** : [Votre nom]
- **Design** : [Designer]
- **Product** : [PM]

---

## 📞 Support

- **Email** : support@antoka.mg
- **GitHub Issues** : [https://github.com/votre-org/antoka/issues](https://github.com/votre-org/antoka/issues)
- **Documentation** : [https://docs.antoka.mg](https://docs.antoka.mg)

---

**Fait avec ❤️ pour Madagascar** 🇲🇬
