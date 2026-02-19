# 🎨 AI Image Transform

Une application web moderne et dynamique pour transformer vos images avec l'intelligence artificielle, utilisant les modèles Seedance et Seedream v4.5, avec intégration de Puter.js pour le stockage cloud.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Fonctionnalités

### ✅ Fonctionnalités actuellement implémentées

- **🖼️ Upload d'images**
  - Glisser-déposer intuitif
  - Sélection de fichiers
  - Prévisualisation en temps réel

- **🤖 Transformation IA**
  - **Seedance** : Transformations artistiques et créatives
  - **Seedream v4.5** : Génération haute résolution native 2K
  - Contrôle de la force de transformation (0.1 à 1.0)
  - Support de multiples formats d'image (1:1, 16:9, 9:16, 4:3)

- **💾 Galerie personnelle**
  - Sauvegarde automatique des créations
  - Visualisation en grille responsive
  - Gestion des images (téléchargement, suppression)
  - Stockage cloud via Puter.js avec fallback localStorage

- **🎨 Interface moderne**
  - Design dark mode élégant
  - Animations fluides et interactives
  - 100% responsive (mobile, tablette, desktop)
  - Notifications toast en temps réel

- **☁️ Intégration Puter.js (GRATUIT et ILLIMITÉ)**
  - Stockage cloud sécurisé sans clés API
  - Espace de stockage illimité gratuit
  - Synchronisation automatique entre appareils
  - Fallback sur localStorage si déconnecté

## 📁 Structure du projet

```
ai-image-transform/
├── index.html              # Page principale
├── css/
│   └── style.css          # Styles complets avec animations
├── js/
│   └── app.js             # Logique applicative
└── README.md              # Documentation
```

## 🚀 URIs et points d'entrée fonctionnels

### Page principale
- **URI** : `/` ou `/index.html`
- **Fonction** : Interface principale de transformation d'images

### Sections accessibles via navigation

1. **Transform** (Par défaut)
   - Upload d'image
   - Configuration des paramètres
   - Génération de transformation
   - Affichage des résultats

2. **Galerie** 
   - Visualisation de toutes les créations
   - Modal de détails avec actions (téléchargement, suppression)

3. **À propos**
   - Informations sur l'application
   - Description des technologies
   - Caractéristiques des modèles IA

## 🛠️ Technologies utilisées

### Frontend
- **HTML5** : Structure sémantique moderne
- **CSS3** : 
  - Variables CSS personnalisées
  - Animations et transitions
  - Flexbox et Grid Layout
  - Design responsive
- **JavaScript (ES6+)** :
  - Modules asynchrones
  - Gestion d'état
  - API Fetch
  - Canvas API pour manipulation d'images

### Librairies externes (via CDN)
- **Puter.js v2** : Stockage cloud et gestion de fichiers
- **Font Awesome 6.4.0** : Icônes vectorielles
- **Google Fonts** : 
  - Inter (300-800)
  - Poppins (400-700)

### Modèles IA intégrés
- **Seedance** : Transformations artistiques et créatives
- **Seedream v4.5** : Génération haute résolution 2K native

## 📊 Modèles de données

### AppState (État de l'application)
```javascript
{
  currentImage: File | null,
  currentImageUrl: string | null,
  currentModel: 'seedance' | 'seedream',
  aspectRatio: '1:1' | '16:9' | '9:16' | '4:3',
  strength: number (0.1 - 1.0),
  gallery: Array<GalleryItem>,
  isPuterInitialized: boolean
}
```

### GalleryItem (Item de galerie)
```javascript
{
  id: number (timestamp),
  imageUrl: string (data URL ou URL cloud),
  model: 'seedance' | 'seedream',
  prompt: string,
  aspectRatio: string,
  strength: number,
  date: string (ISO 8601)
}
```

### Stockage des données

#### Puter.js - Cloud gratuit et illimité (Prioritaire)
- **Avantages** : 🆓 Gratuit, ∞ Illimité, 🔒 Sécurisé, 🌐 Synchronisé
- **Pas de clés API nécessaires** - Authentification via navigateur
- **Fichier** : `ai-image-transform/gallery.json`
- **Structure** : 
```json
{
  "items": [
    {
      "id": 1234567890,
      "imageUrl": "data:image/png;base64,...",
      "model": "seedance",
      "prompt": "Description...",
      "aspectRatio": "1:1",
      "strength": 0.8,
      "date": "2026-02-19T10:30:00.000Z"
    }
  ]
}
```

#### LocalStorage (Fallback)
- **Clé** : `ai-image-gallery`
- **Format** : JSON stringifié du tableau `GalleryItem[]`

## 🔧 Configuration et personnalisation

### Paramètres de transformation

```javascript
// Dans js/app.js, fonction getModelParameters()
const params = {
    model: 'seedance' | 'seedream',
    prompt: string,              // Description de la transformation
    image: string,               // Data URL de l'image source
    aspectRatio: string,         // Format souhaité
    strength: number,            // Force (0.1 - 1.0)
    resolution: '2k'             // Pour Seedream uniquement
};
```

### Personnalisation des couleurs (CSS)

```css
/* Dans css/style.css */
:root {
    --primary: #6366f1;          /* Couleur principale */
    --secondary: #ec4899;        /* Couleur secondaire */
    --bg-primary: #0f172a;       /* Fond principal */
    --text-primary: #f1f5f9;     /* Texte principal */
    /* ... autres variables ... */
}
```

## 🔌 Intégration des API réelles

### ⚠️ Important : Simulation actuelle

Le code actuel contient une **simulation** de transformation d'image pour la démonstration. Pour intégrer les vraies API Seedance et Seedream, vous devez :

### Étapes d'intégration

1. **Obtenir les clés API**
   - Créer un compte sur la plateforme Seedance/Seedream
   - Obtenir vos clés d'authentification

2. **Remplacer la fonction de simulation**
   
   Localiser dans `js/app.js` :
   ```javascript
   async function simulateImageTransformation() {
       // CODE DE SIMULATION ACTUEL
   }
   ```

3. **Implémenter l'appel API réel**

   ```javascript
   async function callImageTransformAPI(params) {
       const apiEndpoints = {
           seedance: 'https://api.seedance.ai/v1/transform',
           seedream: 'https://api.seedream.ai/v4.5/transform'
       };
       
       const endpoint = apiEndpoints[params.model];
       
       const response = await fetch(endpoint, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer YOUR_API_KEY_HERE'
           },
           body: JSON.stringify({
               image: params.image,
               prompt: params.prompt,
               strength: params.strength,
               aspect_ratio: params.aspectRatio,
               ...(params.model === 'seedream' && { resolution: '2k' })
           })
       });
       
       if (!response.ok) {
           throw new Error(`API Error: ${response.statusText}`);
       }
       
       const result = await response.json();
       return result.output_url || result.image_url;
   }
   ```

4. **Mettre à jour la fonction de génération**

   Remplacer l'appel dans `generateTransformation()` :
   ```javascript
   // Remplacer cette ligne:
   const transformedImage = await simulateImageTransformation();
   
   // Par:
   const transformedImage = await callImageTransformAPI(getModelParameters());
   ```

5. **Gérer les erreurs API**

   ```javascript
   try {
       const result = await callImageTransformAPI(params);
       return result;
   } catch (error) {
       if (error.message.includes('401')) {
           showToast('Erreur d\'authentification API', 'error');
       } else if (error.message.includes('429')) {
           showToast('Limite de requêtes atteinte', 'warning');
       } else {
           showToast('Erreur lors de la transformation', 'error');
       }
       throw error;
   }
   ```

## 🚧 Fonctionnalités à implémenter

### Priorité haute
- [ ] **Intégration API réelle**
  - Connexion aux endpoints Seedance et Seedream
  - Gestion de l'authentification
  - Upload d'images vers le service IA

- [ ] **Gestion avancée des images**
  - Recadrage avant transformation
  - Rotation et ajustements
  - Support de plus de formats (WebP, AVIF)

### Priorité moyenne
- [ ] **Historique de transformations**
  - Comparaison avant/après
  - Annuler/Refaire
  - Export de comparaisons

- [ ] **Paramètres avancés**
  - Contrôle de température
  - Nombre d'étapes de dénoising
  - Seed pour reproductibilité

- [ ] **Partage social**
  - Export avec filigrane
  - Liens de partage
  - Intégration réseaux sociaux

### Priorité basse
- [ ] **Mode batch**
  - Transformation multiple d'images
  - Application de style uniforme
  - Export en lot

- [ ] **Presets de styles**
  - Bibliothèque de prompts prédéfinis
  - Styles artistiques populaires
  - Sauvegarde de presets personnalisés

- [ ] **Thème clair**
  - Toggle dark/light mode
  - Préférence utilisateur sauvegardée

## 📋 Recommandations pour le développement

### Prochaines étapes suggérées

1. **Phase 1 : Production Ready**
   - ✅ Intégrer les vraies API Seedance/Seedream
   - ✅ Ajouter la gestion des erreurs robuste
   - ✅ Implémenter un système de crédits/quota
   - ✅ Optimiser les performances

2. **Phase 2 : Amélioration UX**
   - Ajouter des tutoriels interactifs
   - Implémenter des exemples de prompts
   - Créer une galerie publique (optionnelle)
   - Ajouter des statistiques d'utilisation

3. **Phase 3 : Fonctionnalités avancées**
   - Mode batch processing
   - Presets de styles professionnels
   - Export en différentes résolutions
   - API webhook pour intégrations

### Bonnes pratiques

- **Sécurité** : Ne jamais exposer les clés API dans le code frontend
- **Performance** : Compresser les images avant l'upload
- **UX** : Fournir un feedback visuel constant
- **Accessibilité** : Tester avec lecteurs d'écran
- **Mobile** : Optimiser pour les connexions lentes

## 🎯 Utilisation

### Démarrage rapide

1. **Ouvrir l'application**
   - Accéder à `index.html` dans un navigateur
   - Ou déployer sur un serveur web

2. **Transformer une image**
   - Cliquer sur "Sélectionner une image" ou glisser-déposer
   - Choisir le modèle (Seedance ou Seedream)
   - Entrer une description détaillée
   - Ajuster la force et le format
   - Cliquer sur "Générer la transformation"

3. **Gérer vos créations**
   - Télécharger le résultat
   - Sauvegarder dans la galerie
   - Accéder à la galerie via la navigation
   - Visualiser, télécharger ou supprimer

### Exemples de prompts efficaces

```
"Transforme cette photo en peinture impressionniste avec des couleurs vibrantes style Van Gogh"

"Convertis cette image en illustration manga noir et blanc avec des lignes épaisses"

"Crée une version cyberpunk futuriste avec des néons bleus et roses"

"Transforme en aquarelle délicate avec des tons pastel et effets de transparence"
```

## 🐛 Résolution de problèmes

### Problèmes courants

**Q : L'image ne se charge pas**
- Vérifier le format (JPG, PNG, WebP)
- Vérifier la taille (< 10 MB recommandé)

**Q : Puter.js ne fonctionne pas**
- Vérifier la connexion internet
- L'app utilisera localStorage automatiquement

**Q : La génération échoue**
- Vérifier que tous les champs sont remplis
- Essayer avec une force de transformation plus faible

## 📄 Licence

MIT License - Libre d'utilisation et de modification

## 👨‍💻 Auteur

Créé avec ❤️ en 2026

## 🔗 Liens utiles

- [Documentation Puter.js](https://docs.puter.com/)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [Google Fonts](https://fonts.google.com/)

---

**Note** : Cette application est conçue comme une interface frontend. Pour une utilisation en production, assurez-vous d'intégrer les véritables API Seedance et Seedream en suivant les instructions de la section "Intégration des API réelles".