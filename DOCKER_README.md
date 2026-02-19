# 🐳 Docker - AI Image Transform

## Quick Start

### Build et Run

```bash
# Build l'image
docker build -t ai-image-transform .

# Run le conteneur
docker run -d -p 8080:80 --name ai-transform ai-image-transform

# Accéder à l'application
open http://localhost:8080
```

### Arrêter et nettoyer

```bash
# Arrêter le conteneur
docker stop ai-transform

# Supprimer le conteneur
docker rm ai-transform

# Supprimer l'image
docker rmi ai-image-transform
```

---

## 📦 Ce qui est inclus

### Dockerfile
- Base : `nginx:alpine` (~5MB)
- Serveur : Nginx optimisé
- Port : 80

### nginx.conf
- Compression gzip activée
- Cache des assets (1 an)
- Headers de sécurité
- Support SPA

### .dockerignore
- Exclut les fichiers inutiles
- Optimise la taille de l'image

---

## 🚀 Déploiement sur Render.com

### Étape 1 : Push sur GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Étape 2 : Créer un Web Service

1. Aller sur [render.com](https://render.com)
2. Connecter votre repo GitHub
3. Render détectera automatiquement le Dockerfile
4. Cliquer sur "Create Web Service"

### Étape 3 : Configuration

- **Environment** : Docker
- **Plan** : Free
- Le reste est automatique !

### Étape 4 : Déployer

- Render va builder et déployer automatiquement
- Votre app sera disponible sur `https://ai-image-transform.onrender.com`

---

## 🧪 Test local

### Avec Docker

```bash
# Build
docker build -t ai-image-transform .

# Run
docker run -p 8080:80 ai-image-transform

# Test
curl http://localhost:8080
```

### Sans Docker

```bash
# Avec Python
python -m http.server 8080

# Avec Node.js
npx serve

# Avec PHP
php -S localhost:8080
```

---

## 📊 Taille de l'image

```bash
# Voir la taille
docker images ai-image-transform

# Résultat attendu : ~10-15MB
```

---

## 🔧 Configuration avancée

### Variables d'environnement

```bash
docker run -p 8080:80 \
  -e SEEDANCE_API_KEY=your_key \
  -e SEEDREAM_API_KEY=your_key \
  ai-image-transform
```

### Volume pour les logs

```bash
docker run -p 8080:80 \
  -v $(pwd)/logs:/var/log/nginx \
  ai-image-transform
```

---

## 📚 Documentation complète

Voir : **[DEPLOY_GUIDE.md](DEPLOY_GUIDE.md)** pour le guide complet de déploiement

---

## 🎯 Commandes utiles

```bash
# Voir les logs
docker logs ai-transform

# Logs en temps réel
docker logs -f ai-transform

# Entrer dans le conteneur
docker exec -it ai-transform /bin/sh

# Stats du conteneur
docker stats ai-transform

# Inspecter le conteneur
docker inspect ai-transform
```

---

## 🌟 Render.com vs Docker local

| Aspect | Docker local | Render.com |
|--------|-------------|------------|
| Setup | Manuel | Automatique |
| URL | localhost | URL publique |
| HTTPS | Non | Oui (auto) |
| Accessible | Local only | Monde entier |
| Coût | Gratuit | Gratuit |

---

## ✅ Checklist

- [x] Dockerfile créé
- [x] nginx.conf configuré
- [x] .dockerignore ajouté
- [x] render.yaml créé
- [x] Documentation complète

---

**🐳 Prêt pour le déploiement ! 🚀**