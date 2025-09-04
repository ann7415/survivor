# Dockerfile multi-stage pour Backend .NET 9.0 + Frontend Angular

# Stage 1: Build Frontend Angular
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend

# Copier les fichiers de configuration npm
COPY Frontend/package*.json ./
RUN npm ci

# Copier le code source du frontend
COPY Frontend/ ./
RUN npm install -g @angular/cli
RUN npm run build

# Stage 2: Build Backend .NET
FROM mcr.microsoft.com/dotnet/sdk:9.0-alpine AS backend-build
WORKDIR /app/backend

# Copier le fichier de projet
COPY Backend/JebIncubator.Api/*.csproj ./
RUN dotnet restore

# Copier le code source du backend
COPY Backend/JebIncubator.Api/ ./
RUN dotnet publish -c Release -o out

# Stage 3: Runtime - Servir les deux applications
FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine AS runtime
WORKDIR /app

# Installer nginx pour servir le frontend
RUN apk add --no-cache nginx

# Copier le backend compilé
COPY --from=backend-build /app/backend/out ./backend

# Copier le frontend compilé
COPY --from=frontend-build /app/frontend/dist/my-app ./frontend

# Créer la configuration nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Créer le script de démarrage
COPY start.sh ./
RUN chmod +x ./start.sh

# Exposer les ports
EXPOSE 80 5000

# Variables d'environnement pour le backend
ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=Production

# Démarrer les services
CMD ["./start.sh"]
