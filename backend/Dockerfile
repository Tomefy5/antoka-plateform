# ========================================
# Stage 1: Build (Compilation TypeScript)
# ========================================
FROM node:20-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances en premier (cache Docker)
COPY package*.json ./

# Installer TOUTES les dépendances (dev + prod pour compiler TS)
RUN npm ci

# Copier le code source
COPY . .

# Compiler TypeScript → JavaScript dans /app/dist
RUN npm run build

# Nettoyer les devDependencies après build
RUN npm prune --production

# ========================================
# Stage 2: Production (Image finale légère)
# ========================================
FROM node:20-alpine

# Créer un utilisateur non-root pour sécurité
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires depuis le builder
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./

# Passer à l'utilisateur non-root
USER nodejs

# Exposer le port du service
EXPOSE 3000

# Variables d'environnement par défaut
ENV NODE_ENV=production
ENV PORT=3001

# Commande de démarrage
CMD ["node", "dist/index.js"]
