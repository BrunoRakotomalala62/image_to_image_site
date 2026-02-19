# 🚀 Guide de déploiement sur Render.com

## 📋 Prérequis

- ✅ Compte Render.com (gratuit)
- ✅ Compte GitHub (pour connecter le repo)
- ✅ Fichiers du projet

---

## 🐳 Fichiers Docker créés

### 1. `Dockerfile`
Configuration Docker avec Nginx pour servir les fichiers statiques.

**Caractéristiques** :
- 🏔️ Image Alpine Linux (légère, ~5MB)
- 🌐 Nginx pour servir les fichiers
- ⚡ Optimisé pour les performances
- 🔒 Configuration sécurisée

### 2. `nginx.conf`
Configuration Nginx optimisée.

**Fonctionnalités** :
- ✅ Compression gzip activée
- ✅ Cache des fichiers statiques (1 an)
- ✅ Headers de sécurité
- ✅ Support des routes SPA
- ✅ Support des fichiers Markdown

### 3. `.dockerignore`
Optimise la taille de l'image Docker en excluant les fichiers inutiles.

### 4. `render.yaml`
Configuration automatique pour Render.com.

---

## 🚀 Méthode 1 : Déploiement automatique (Recommandé)

### Étape 1 : Préparer le repository Git

```bash
# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Commit
git commit -m "Initial commit - AI Image Transform"

# Créer un repo sur GitHub et le connecter
git remote add origin https://github.com/VOTRE-USERNAME/ai-image-transform.git
git branch -M main
git push -u origin main
```

### Étape 2 : Connecter à Render.com

1. **Aller sur** [Render.com](https://render.com)
2. **Se connecter** avec GitHub
3. **Cliquer sur** "New +" → "Web Service"
4. **Connecter le repository** GitHub
5. **Render détectera automatiquement** le `render.yaml`

### Étape 3 : Configuration automatique

Render va automatiquement :
- ✅ Détecter le Dockerfile
- ✅ Builder l'image Docker
- ✅ Déployer l'application
- ✅ Fournir une URL publique

### Étape 4 : Accéder à votre application

```
https://ai-image-transform.onrender.com
```

---

## 🔧 Méthode 2 : Configuration manuelle

### Étape 1 : Créer un nouveau Web Service

1. Aller sur [Dashboard Render](https://dashboard.render.com)
2. Cliquer sur **"New +"** → **"Web Service"**
3. Connecter votre repository GitHub

### Étape 2 : Configuration du service

| Paramètre | Valeur |
|-----------|--------|
| **Name** | `ai-image-transform` |
| **Environment** | `Docker` |
| **Region** | Choisir la plus proche |
| **Branch** | `main` |
| **Dockerfile Path** | `./Dockerfile` |
| **Docker Build Context Directory** | `.` |

### Étape 3 : Plan et déploiement

- **Plan** : Free (gratuit)
- **Cliquer sur** "Create Web Service"

### Étape 4 : Attendre le déploiement

Le déploiement prend environ 2-5 minutes :
```
Building... ⏳
Deploying... 🚀
Live! ✅
```

---

## 🌐 Configuration avancée

### Variables d'environnement (optionnel)

Si vous ajoutez les vraies API plus tard :

```bash
# Sur Render.com → Environment
SEEDANCE_API_KEY=votre_clé
SEEDREAM_API_KEY=votre_clé
```

### Domaine personnalisé

1. Aller dans **Settings** → **Custom Domain**
2. Ajouter votre domaine
3. Configurer les DNS selon les instructions

---

## 📊 Caractéristiques du plan gratuit Render

| Caractéristique | Plan Free |
|----------------|-----------|
| **Coût** | 🆓 Gratuit |
| **Trafic** | Illimité |
| **Bande passante** | 100 GB/mois |
| **Build minutes** | 500 min/mois |
| **SSL/HTTPS** | ✅ Inclus |
| **Sleep après inactivité** | 15 minutes |
| **Domaine personnalisé** | ✅ Supporté |

⚠️ **Note** : L'app se met en veille après 15 min d'inactivité. Premier accès = ~30s de réveil.

---

## 🔄 Déploiement continu (CI/CD)

### Configuration automatique

Render détecte automatiquement les changements :

```bash
# Faire des modifications
git add .
git commit -m "Mise à jour"
git push

# Render déploiera automatiquement ! 🚀
```

### Webhook de déploiement

Pour déclencher manuellement :

1. **Settings** → **Deploy Hook**
2. Copier l'URL du webhook
3. Utiliser avec `curl` :

```bash
curl -X POST https://api.render.com/deploy/srv-xxxxx
```

---

## 🐛 Dépannage

### Problème : Build échoue

**Solution** :
```bash
# Vérifier que tous les fichiers sont présents
ls -la

# Vérifier le Dockerfile
cat Dockerfile

# Tester localement
docker build -t ai-image-transform .
docker run -p 8080:80 ai-image-transform
```

### Problème : Page ne se charge pas

**Solution** :
1. Vérifier les logs sur Render
2. Vérifier que le port 80 est exposé
3. Vérifier nginx.conf

### Problème : Fichiers statiques ne se chargent pas

**Solution** :
```nginx
# Vérifier dans nginx.conf
location ~* \.(css|js|png|jpg)$ {
    expires 1y;
    add_header Cache-Control "public";
}
```

---

## 🧪 Test local avec Docker

### Build l'image

```bash
docker build -t ai-image-transform .
```

### Run le conteneur

```bash
docker run -p 8080:80 ai-image-transform
```

### Tester

```bash
# Ouvrir dans le navigateur
http://localhost:8080
```

---

## 📈 Optimisations

### 1. Réduire la taille de l'image

```dockerfile
# Déjà optimisé avec Alpine
FROM nginx:alpine  # ~5MB seulement
```

### 2. Améliorer le cache

```nginx
# Dans nginx.conf
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. Compression gzip

```nginx
# Déjà activé dans nginx.conf
gzip on;
gzip_comp_level 6;
```

---

## 🔒 Sécurité

### Headers de sécurité (déjà configurés)

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
```

### HTTPS automatique

Render fournit automatiquement :
- ✅ Certificat SSL/TLS gratuit
- ✅ HTTPS par défaut
- ✅ Renouvellement automatique

---

## 📱 Surveillance et logs

### Voir les logs en temps réel

1. Dashboard Render → Votre service
2. Onglet **"Logs"**
3. Logs en temps réel

### Métriques

1. Onglet **"Metrics"**
2. Voir :
   - CPU usage
   - Memory usage
   - Request rate
   - Response time

---

## 💰 Coûts estimés

### Plan Free (Recommandé pour commencer)

```
Coût mensuel : 0€
Limitations :
- Sleep après 15min d'inactivité
- 500 build minutes/mois
- 100GB bande passante/mois
```

### Plan Starter (Si besoin)

```
Coût mensuel : 7$/mois
Avantages :
- Pas de sleep
- Plus de ressources
- Support prioritaire
```

---

## 🎯 Checklist de déploiement

### Avant le déploiement

- [ ] Tous les fichiers sont commités sur Git
- [ ] Dockerfile est présent
- [ ] nginx.conf est configuré
- [ ] .dockerignore est créé
- [ ] render.yaml est présent
- [ ] Test local réussi

### Après le déploiement

- [ ] Application accessible via URL Render
- [ ] Toutes les pages se chargent
- [ ] CSS et JS fonctionnent
- [ ] Images se chargent
- [ ] Puter.js fonctionne
- [ ] Tests effectués

---

## 🌟 Commandes utiles

### Build local

```bash
docker build -t ai-image-transform .
```

### Run local

```bash
docker run -p 8080:80 ai-image-transform
```

### Logs Docker

```bash
docker logs <container-id>
```

### Shell dans le conteneur

```bash
docker exec -it <container-id> /bin/sh
```

### Nettoyer

```bash
docker system prune -a
```

---

## 📚 Ressources

### Documentation officielle

- 🌐 [Render.com Docs](https://render.com/docs)
- 🐳 [Docker Docs](https://docs.docker.com)
- 🌊 [Nginx Docs](https://nginx.org/en/docs/)

### Support

- 💬 [Render Community](https://community.render.com)
- 📧 [Render Support](https://render.com/support)

---

## 🎉 Félicitations !

Votre application **AI Image Transform** est maintenant déployée sur Render.com !

### URL de votre application

```
https://ai-image-transform.onrender.com
```

### Partager

- 📱 Sur mobile
- 💻 Sur desktop
- 🌍 Partout dans le monde

---

## 🔄 Prochaines étapes

1. ✅ **Tester l'application** en ligne
2. ✅ **Partager l'URL** avec d'autres
3. ✅ **Configurer un domaine** personnalisé (optionnel)
4. ✅ **Intégrer les vraies API** Seedance/Seedream
5. ✅ **Monitorer les performances**

---

## 💡 Conseils

### Performance

- ⚡ Utiliser un CDN pour les assets
- 🗜️ Compresser les images avant upload
- 💾 Activer le cache navigateur

### Sécurité

- 🔒 Toujours utiliser HTTPS (automatique sur Render)
- 🔑 Ne jamais committer les clés API
- 🛡️ Utiliser des variables d'environnement

### Monitoring

- 📊 Vérifier les métriques régulièrement
- 🔍 Analyser les logs d'erreur
- 📈 Surveiller l'utilisation des ressources

---

**🚀 Votre application est maintenant en ligne et accessible au monde entier ! 🌍✨**

*Guide créé le 19 février 2026*