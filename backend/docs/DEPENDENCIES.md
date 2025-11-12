# Guide des Dépendances Backend - Antoka

Ce document explique le rôle de chaque bibliothèque et outil utilisé dans le backend d'Antoka.

## 📦 Dépendances de Production

### Framework & Serveur Web

**express** (^4.18.0)
- **Rôle** : Framework web minimaliste pour construire l'API REST
- **Utilisation** : API Gateway, routage, middlewares
- **Services concernés** : Tous les services backend

### Base de Données & Authentification

**@supabase/supabase-js** (^2.x)
- **Rôle** : Client officiel Supabase pour l'auth et la base PostgreSQL
- **Utilisation** : Authentification utilisateur, MFA, stockage documents, RLS
- **Services concernés** : auth, tous les services accédant à la base

### Sécurité & Authentification

**jsonwebtoken** (^9.x)
- **Rôle** : Création et vérification de tokens JWT pour l'authentification
- **Utilisation** : Sessions utilisateur, refresh tokens, claims personnalisés
- **Services concernés** : auth, api-gateway (middlewares)

**bcrypt** (^5.x)
- **Rôle** : Hachage sécurisé des mots de passe avec salt
- **Utilisation** : Stockage sécurisé des credentials
- **Services concernés** : auth

**helmet** (^7.x)
- **Rôle** : Sécurise les headers HTTP (XSS, clickjacking, etc.)
- **Utilisation** : Protection automatique contre vulnérabilités web courantes
- **Services concernés** : api-gateway

**cors** (^2.x)
- **Rôle** : Gestion des politiques CORS (Cross-Origin Resource Sharing)
- **Utilisation** : Autoriser uniquement les origines de confiance
- **Services concernés** : api-gateway

**express-rate-limit** (^6.x)
- **Rôle** : Limitation du nombre de requêtes par IP/utilisateur
- **Utilisation** : Protection contre brute force, DDoS, abus API
- **Services concernés** : api-gateway

### Validation & Configuration

**express-validator** (^7.x)
- **Rôle** : Validation et sanitization des inputs utilisateur
- **Utilisation** : Validation body/query/params avant traitement
- **Services concernés** : Tous les services exposant des endpoints

**zod** (^3.x)
- **Rôle** : Validation de schémas TypeScript avec inférence de types
- **Utilisation** : Validation des données métier, DTOs
- **Services concernés** : Tous les services

**dotenv** (^16.x)
- **Rôle** : Chargement des variables d'environnement depuis fichiers .env
- **Utilisation** : Configuration par environnement (dev/staging/prod)
- **Services concernés** : Tous les services

### Logging & Monitoring

**morgan** (^1.x)
- **Rôle** : Logger HTTP pour tracer les requêtes/réponses
- **Utilisation** : Logs d'accès formatés, debugging, audit
- **Services concernés** : api-gateway, tous les services

**compression** (^1.x)
- **Rôle** : Compression gzip/deflate des réponses HTTP
- **Utilisation** : Réduction bande passante, amélioration performance
- **Services concernés** : api-gateway

### HTTP Client

**axios** (^1.x)
- **Rôle** : Client HTTP pour appels API externes
- **Utilisation** : Appels Gemini API, webhooks, services tiers
- **Services concernés** : docgen, clause-analyzer

### Intelligence Artificielle

**@google/generative-ai** (^0.x)
- **Rôle** : SDK officiel Google Gemini pour génération de texte
- **Utilisation** : Génération de documents légaux, traduction, fallback Ollama
- **Services concernés** : docgen

**@tensorflow/tfjs-node** (^4.x)
- **Rôle** : TensorFlow pour Node.js (exécution côté serveur)
- **Utilisation** : Détection de clauses abusives, scoring de risques
- **Services concernés** : clause-analyzer

### Blockchain

**@hashgraph/sdk** (^2.x)
- **Rôle** : SDK Hedera pour consensus distribué et timestamping
- **Utilisation** : Enregistrement signatures, preuves immuables, vérification
- **Services concernés** : blockchain

**ethers** (^6.x)
- **Rôle** : Bibliothèque Ethereum/EVM (Polygon fallback)
- **Utilisation** : Backup blockchain si Hedera indisponible
- **Services concernés** : blockchain

### Temps Réel

**socket.io** (^4.x)
- **Rôle** : WebSocket bidirectionnel pour communication temps réel
- **Utilisation** : Collaboration multi-utilisateur, notifications live
- **Services concernés** : collaboration

### Analytics

**duckdb** (^0.x)
- **Rôle** : Base de données analytique embarquée (OLAP)
- **Utilisation** : Agrégation métriques, rapports, dashboard
- **Services concernés** : analytics

---

## 🛠️ Dépendances de Développement

**typescript** (^5.x)
- **Rôle** : Superset JavaScript avec typage statique
- **Utilisation** : Développement avec types, compilation vers JS

**ts-node-dev** (^2.x)
- **Rôle** : Exécution TypeScript avec hot reload
- **Utilisation** : Développement rapide sans recompilation manuelle

**nodemon** (^3.x)
- **Rôle** : Redémarrage automatique du serveur sur changements
- **Utilisation** : Alternative à ts-node-dev pour certains workflows

**@types/node** (^20.x)
- **Rôle** : Typings TypeScript pour l'API Node.js
- **Utilisation** : Autocomplétion et vérification types Node

**@types/express** (^4.x)
- **Rôle** : Typings TypeScript pour Express
- **Utilisation** : Types Request, Response, Middleware

**@types/jsonwebtoken**, **@types/bcrypt**, **@types/cors**, **@types/morgan**
- **Rôle** : Typings pour bibliothèques respectives
- **Utilisation** : Développement TypeScript avec autocomplétion

**eslint** (^8.x)
- **Rôle** : Linter JavaScript/TypeScript
- **Utilisation** : Détection erreurs, application standards code

**prettier** (^3.x)
- **Rôle** : Formateur de code automatique
- **Utilisation** : Cohérence style, intégration CI/CD

---

## 📋 Mapping Services → Dépendances

| Service | Dépendances principales |
|---------|------------------------|
| **api-gateway** | express, helmet, cors, rate-limit, validator, morgan, compression |
| **auth** | @supabase/supabase-js, jsonwebtoken, bcrypt |
| **docgen** | axios, @google/generative-ai, @supabase/supabase-js |
| **clause-analyzer** | @tensorflow/tfjs-node, @supabase/supabase-js |
| **blockchain** | @hashgraph/sdk, ethers, @supabase/supabase-js |
| **collaboration** | socket.io, @supabase/supabase-js |
| **analytics** | duckdb |

---

## 🔄 Mises à Jour

Pour mettre à jour les dépendances :

```
# Vérifier les versions obsolètes
npm outdated

# Mettre à jour toutes les dépendances mineures/patches
npm update

# Mettre à jour une dépendance spécifique
npm install package-name@latest

# Audit de sécurité
npm audit
npm audit fix
```

---

## 📚 Documentation Officielle

- **Express**: https://expressjs.com/
- **Supabase**: https://supabase.com/docs
- **Hedera**: https://docs.hedera.com/
- **TensorFlow.js**: https://www.tensorflow.org/js
- **Socket.io**: https://socket.io/docs/
- **Gemini API**: https://ai.google.dev/docs

---

**Dernière mise à jour** : 2025-11-12
