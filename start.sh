#!/bin/sh

# Script de démarrage pour le conteneur Docker
echo "🚀 Démarrage de l'application..."

# Créer les répertoires nécessaires pour nginx
mkdir -p /var/log/nginx
mkdir -p /var/lib/nginx/tmp

# Vérifier que le frontend a été construit
if [ ! -f "/app/frontend/index.html" ]; then
    echo "❌ Erreur: Le frontend n'a pas été trouvé dans /app/frontend/"
    exit 1
fi

# Vérifier que le backend a été construit
if [ ! -f "/app/backend/JebIncubator.Api.dll" ]; then
    echo "❌ Erreur: Le backend n'a pas été trouvé dans /app/backend/"
    exit 1
fi

echo "✅ Frontend trouvé dans /app/frontend/"
echo "✅ Backend trouvé dans /app/backend/"

# Démarrer nginx en arrière-plan
echo "🌐 Démarrage de nginx pour servir le frontend..."
nginx -g 'daemon off;' &
NGINX_PID=$!

# Attendre un peu que nginx démarre
sleep 2

# Démarrer l'API backend .NET
echo "⚡ Démarrage de l'API backend .NET..."
cd /app/backend
exec dotnet JebIncubator.Api.dll &
BACKEND_PID=$!

echo "🎉 Application démarrée avec succès!"
echo "📱 Frontend accessible sur: http://localhost:80"
echo "🔌 API Backend accessible sur: http://localhost:80/api"
echo "🔧 API directe accessible sur: http://localhost:5000"

# Fonction pour gérer l'arrêt propre
cleanup() {
    echo "🛑 Arrêt en cours..."
    kill $NGINX_PID 2>/dev/null
    kill $BACKEND_PID 2>/dev/null
    exit 0
}

# Capturer les signaux d'arrêt
trap cleanup SIGTERM SIGINT

# Attendre que les processus se terminent
wait
