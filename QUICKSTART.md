# 🚀 Guide de démarrage rapide

## Lancement de l'application

### Option 1 : Ouverture directe
1. Double-cliquer sur `index.html`
2. L'application s'ouvre dans votre navigateur par défaut

### Option 2 : Serveur local (recommandé)

**Avec Python 3:**
```bash
python -m http.server 8000
```
Puis accéder à : http://localhost:8000

**Avec Node.js (npx):**
```bash
npx serve
```

**Avec PHP:**
```bash
php -S localhost:8000
```

## Première utilisation

### 1. Tester l'upload d'image
- Préparez une image JPG ou PNG (< 10 MB)
- Glissez-déposez l'image dans la zone d'upload
- Ou cliquez sur "Sélectionner une image"

### 2. Configurer la transformation
- **Modèle** : Choisissez entre Seedance (artistique) ou Seedream (haute résolution)
- **Prompt** : Entrez une description détaillée de ce que vous voulez
- **Force** : Ajustez de 0.1 (subtile) à 1.0 (forte)
- **Format** : Choisissez le ratio (1:1, 16:9, 9:16, 4:3)

### 3. Générer et sauvegarder
- Cliquez sur "Générer la transformation"
- Attendez le traitement (2-5 secondes en mode démo)
- Téléchargez ou sauvegardez dans la galerie

## Exemples de prompts pour tester

### Style artistique
```
Transforme cette photo en peinture à l'huile impressionniste avec des coups de pinceau visibles et des couleurs vives
```

### Style manga
```
Convertis cette image en style manga japonais avec des lignes noires épaisses et des ombrages en demi-tons
```

### Style futuriste
```
Crée une version cyberpunk avec des néons, des reflets métalliques et une ambiance nocturne urbaine
```

### Style aquarelle
```
Transforme en aquarelle douce avec des dégradés pastels et des effets de transparence
```

## Fonctionnalités à tester

### ✅ Upload
- [x] Glisser-déposer
- [x] Sélection de fichier
- [x] Prévisualisation
- [x] Changement d'image

### ✅ Contrôles
- [x] Sélection de modèle
- [x] Saisie de prompt
- [x] Slider de force
- [x] Boutons de ratio

### ✅ Transformation
- [x] Barre de progression
- [x] Messages d'état
- [x] Affichage du résultat

### ✅ Actions sur le résultat
- [x] Téléchargement
- [x] Sauvegarde en galerie
- [x] Nouvelle transformation

### ✅ Galerie
- [x] Affichage en grille
- [x] Modal de détails
- [x] Téléchargement depuis galerie
- [x] Suppression

### ✅ Navigation
- [x] Onglets Transform / Galerie / À propos
- [x] Animation de transition

### ✅ Notifications
- [x] Toast de succès
- [x] Toast d'erreur
- [x] Messages d'état

## Dépannage rapide

### L'image ne se charge pas
- Vérifiez que le fichier est une image valide (JPG, PNG, WebP)
- Réduisez la taille si > 10 MB
- Essayez un autre navigateur

### Puter.js ne se connecte pas
- Normal : l'app utilisera localStorage comme fallback
- Pour activer Puter : créer un compte sur puter.com

### Bouton "Générer" désactivé
- Vérifiez qu'une image est chargée
- Vérifiez que le prompt n'est pas vide

### Rien ne se passe après "Générer"
- Ouvrez la console (F12) pour voir les erreurs
- En mode démo, la transformation est simulée (effet de saturation)

## Note importante : Mode Démonstration

⚠️ **L'application est actuellement en mode DÉMONSTRATION**

La transformation d'image utilise une simulation qui applique un simple effet de saturation. Pour utiliser les vraies API Seedance et Seedream :

1. Consultez la section "Intégration des API réelles" dans README.md
2. Obtenez vos clés API
3. Modifiez la fonction `simulateImageTransformation()` dans `js/app.js`
4. Remplacez-la par les vrais appels API

## Structure des fichiers

```
ai-image-transform/
├── index.html              # Page principale
├── css/
│   └── style.css          # Tous les styles
├── js/
│   └── app.js             # Toute la logique
├── README.md              # Documentation complète
└── QUICKSTART.md          # Ce guide (vous êtes ici)
```

## Support navigateur

### ✅ Compatibles
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### ⚠️ Partiellement compatibles
- Chrome 80-89
- Firefox 78-87
- Safari 13

### ❌ Non compatibles
- Internet Explorer (toutes versions)
- Anciens navigateurs mobiles

## Raccourcis clavier

- **Echap** : Fermer le modal de galerie
- **Tab** : Navigation entre les champs
- **Entrée** : Submit (dans les champs de formulaire)

## Optimisations recommandées

### Avant upload
- Compresser les images volumineuses
- Utiliser des formats modernes (WebP, AVIF)
- Recadrer si nécessaire

### Pour de meilleures performances
- Utiliser un navigateur récent
- Fermer les onglets inutilisés
- Vider le cache si problèmes

## Contact et support

Pour toute question ou problème :
1. Consultez d'abord le README.md complet
2. Vérifiez la console du navigateur (F12)
3. Testez dans un autre navigateur

## Prochaines étapes

Une fois familiarisé avec l'application :
1. Explorez le code dans `js/app.js`
2. Personnalisez les couleurs dans `css/style.css`
3. Intégrez les vraies API (voir README.md)
4. Ajoutez vos propres fonctionnalités

---

**Bon développement ! 🎨✨**