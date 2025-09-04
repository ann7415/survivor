# 🐳 Containerisation Docker - Projet Survivor

Cette configuration Docker permet de déployer l'application Survivor complète (Frontend Angular + Backend .NET) dans un seul conteneur.

## 🏗️ Architecture

- **Frontend**: Application Angular servie par Nginx sur le port 80
- **Backend**: API .NET 9.0 accessible via proxy Nginx sur `/api/` ou directement sur le port 5000
- **Reverse Proxy**: Nginx pour router les requêtes frontend/backend

## 🚀 Démarrage rapide

### Option 1: Avec Docker Compose (Recommandé)
```bash
# Construire et démarrer l'application
docker-compose up --build

# En arrière-plan
docker-compose up --build -d

# Arrêter l'application
docker-compose down
```

### Option 2: Avec Docker directement
```bash
# Construire l'image
docker build -t survivor-app .

# Démarrer le conteneur
docker run -p 8080:80 -p 5000:5000 --name survivor survivor-app

# Arrêter le conteneur
docker stop survivor
docker rm survivor
```

## 🌐 Accès aux services

Une fois le conteneur démarré :

- **🌍 Application complète**: http://localhost:8080
  - Frontend Angular accessible directement
  - API accessible via http://localhost:8080/api/

- **🔧 API directe**: http://localhost:5000 (optionnel)

## 📁 Structure des fichiers Docker

```
.
├── Dockerfile              # Configuration multi-stage
├── docker-compose.yml      # Orchestration
├── nginx.conf              # Configuration du reverse proxy
├── start.sh                # Script de démarrage
├── .dockerignore           # Optimisation de l'image
└── DOCKER.md              # Cette documentation
```

## 🛠️ Développement

### Rebuild après modification
```bash
# Reconstruire et redémarrer
docker-compose down
docker-compose up --build

# Ou forcer la reconstruction
docker-compose build --no-cache
docker-compose up
```

### Debugging
```bash
# Voir les logs
docker-compose logs -f

# Accéder au conteneur
docker exec -it survivor-fullstack sh

# Voir les processus actifs
docker exec -it survivor-fullstack ps aux
```

### Variables d'environnement

Modifiez le fichier `docker-compose.yml` pour personnaliser :

```yaml
environment:
  - ASPNETCORE_ENVIRONMENT=Development  # ou Production
  - ASPNETCORE_URLS=http://+:5000
  # Ajoutez d'autres variables selon vos besoins
```

## 🧪 Tests

```bash
# Tester la santé du conteneur
docker exec -it survivor-fullstack wget -qO- http://localhost/

# Tester l'API
docker exec -it survivor-fullstack wget -qO- http://localhost:5000/api/health
```

## ⚡ Optimisations

L'image Docker utilise :
- **Multi-stage build** pour optimiser la taille
- **Alpine Linux** pour une base légère
- **Nginx** pour les performances frontend
- **.dockerignore** pour exclure les fichiers inutiles

## 🐛 Dépannage

### Le conteneur ne démarre pas
```bash
# Vérifier les logs
docker-compose logs

# Reconstruire proprement
docker-compose down --volumes --rmi all
docker-compose up --build
```

### Problème de ports
```bash
# Vérifier les ports utilisés
netstat -tulpn | grep :8080

# Changer les ports dans docker-compose.yml si nécessaire
ports:
  - "3000:80"    # Au lieu de 8080:80
```

### Problèmes de permissions
```bash
# Sur Linux, donner les permissions au script
chmod +x start.sh
```
