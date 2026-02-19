# 📚 Exemples de configuration et cas d'usage

Ce fichier contient des exemples pratiques pour différents scénarios d'utilisation de l'application.

## 🎨 Exemples de prompts par catégorie

### Styles artistiques

#### Impressionnisme
```
Transforme cette photo en peinture impressionniste avec des coups de pinceau visibles, 
des couleurs vibrantes et des jeux de lumière style Claude Monet
```

#### Art Nouveau
```
Convertis cette image en style Art Nouveau avec des lignes organiques fluides, 
des motifs floraux et une palette de couleurs pastel élégante
```

#### Cubisme
```
Recrée cette image en style cubiste avec des formes géométriques fragmentées, 
multiples perspectives et palette de couleurs terreuses
```

#### Aquarelle
```
Transforme en aquarelle délicate avec des dégradés fluides, des transparences, 
des couleurs pastels qui se fondent et des bords doux
```

### Styles numériques modernes

#### Cyberpunk
```
Crée une version cyberpunk futuriste avec des néons brillants rose et bleu, 
des reflets métalliques, une ambiance urbaine nocturne et une pluie artificielle
```

#### Vaporwave
```
Transforme en style vaporwave avec des gradients rose-violet-cyan, 
des effets de glitch, des éléments rétro 80s-90s et une esthétique surréaliste
```

#### Low Poly
```
Convertis cette image en style low poly 3D avec des polygones géométriques colorés, 
des facettes visibles et un rendu moderne minimaliste
```

#### Pixel Art
```
Transforme en pixel art rétro 16-bit avec des pixels visibles, 
palette de couleurs limitée et style jeux vidéo années 90
```

### Styles photographiques

#### Film Noir
```
Convertis en style film noir dramatique avec fort contraste noir et blanc, 
ombres profondes, éclairage cinématographique et ambiance mystérieuse
```

#### Vintage Polaroid
```
Donne un effet Polaroid vintage avec couleurs délavées, vignettage doux, 
légère surexposition et grain de film nostalgique
```

#### HDR dramatique
```
Crée une version HDR avec détails ultra-réalistes, couleurs saturées, 
contraste élevé et clarté augmentée pour un effet dramatique
```

### Styles de bande dessinée

#### Manga
```
Convertis en style manga japonais avec lignes noires épaisses, 
ombrages en demi-tons, traits expressifs et ambiance dynamique
```

#### Comics américain
```
Transforme en style comics superhéros avec couleurs vives et saturées, 
contours noirs marqués, effets Ben-Day dots et composition dynamique
```

#### Bande dessinée franco-belge
```
Crée un style BD franco-belge avec ligne claire, couleurs plates harmonieuses, 
contours nets et esthétique cartoonesque réaliste
```

## ⚙️ Configurations de paramètres recommandées

### Pour des transformations subtiles
```javascript
{
    model: 'seedance',
    strength: 0.3,
    prompt: 'Améliore légèrement les couleurs et la netteté',
    aspectRatio: '1:1'
}
```

### Pour des transformations artistiques moyennes
```javascript
{
    model: 'seedance',
    strength: 0.6,
    prompt: 'Style aquarelle avec couleurs pastels',
    aspectRatio: '16:9'
}
```

### Pour des transformations radicales
```javascript
{
    model: 'seedream',
    strength: 0.9,
    prompt: 'Univers cyberpunk futuriste avec néons',
    aspectRatio: '9:16'
}
```

### Pour la haute résolution
```javascript
{
    model: 'seedream',  // Seedream v4.5 pour 2K natif
    strength: 0.7,
    prompt: 'Amélioration détaillée avec textures riches',
    aspectRatio: '4:3'
}
```

## 📐 Guide des formats d'image

### 1:1 (Carré)
- **Utilisation** : Posts Instagram, avatars, vignettes
- **Dimensions typiques** : 1024x1024, 2048x2048
```javascript
aspectRatio: '1:1'
```

### 16:9 (Paysage large)
- **Utilisation** : Bannières web, YouTube, présentations
- **Dimensions typiques** : 1920x1080, 2560x1440
```javascript
aspectRatio: '16:9'
```

### 9:16 (Portrait mobile)
- **Utilisation** : Stories Instagram/Facebook, TikTok
- **Dimensions typiques** : 1080x1920
```javascript
aspectRatio: '9:16'
```

### 4:3 (Standard)
- **Utilisation** : Présentations, impressions
- **Dimensions typiques** : 1600x1200, 2048x1536
```javascript
aspectRatio: '4:3'
```

## 🎯 Cas d'usage professionnels

### 1. Marketing et publicité
```javascript
// Créer une version stylisée d'un produit
{
    model: 'seedream',
    strength: 0.6,
    prompt: 'Photo produit lifestyle avec ambiance lumineuse naturelle, mise en scène élégante et arrière-plan flou artistique',
    aspectRatio: '1:1'
}
```

### 2. Design d'interface
```javascript
// Créer des images d'illustration pour UI
{
    model: 'seedance',
    strength: 0.7,
    prompt: 'Illustration vectorielle plate avec style moderne minimaliste, couleurs pastel harmonieuses et formes géométriques simplifiées',
    aspectRatio: '16:9'
}
```

### 3. Contenu de blog
```javascript
// Images d'en-tête de blog
{
    model: 'seedream',
    strength: 0.5,
    prompt: 'Image d\'en-tête professionnelle avec composition équilibrée, palette de couleurs cohérente et espace pour texte overlay',
    aspectRatio: '16:9'
}
```

### 4. Réseaux sociaux
```javascript
// Posts Instagram artistiques
{
    model: 'seedance',
    strength: 0.8,
    prompt: 'Style vintage Instagram avec filtres chaleureux, grain de film subtil, vignettage doux et couleurs nostalgiques',
    aspectRatio: '1:1'
}
```

### 5. Portraits artistiques
```javascript
// Transformation de portraits
{
    model: 'seedream',
    strength: 0.6,
    prompt: 'Portrait artistique avec éclairage dramatique, fond flou bokeh, couleurs riches et ambiance cinématographique',
    aspectRatio: '4:3'
}
```

## 🔧 Personnalisation avancée du code

### Modifier les couleurs du thème

Dans `css/style.css`, modifiez les variables CSS :

```css
:root {
    /* Thème violet-rose (par défaut) */
    --primary: #6366f1;
    --secondary: #ec4899;
    
    /* Alternative : Thème bleu-vert */
    --primary: #0ea5e9;
    --secondary: #10b981;
    
    /* Alternative : Thème orange-rouge */
    --primary: #f97316;
    --secondary: #ef4444;
}
```

### Ajouter des presets de prompts

Dans `js/app.js`, ajoutez avant `init()` :

```javascript
const PROMPT_PRESETS = {
    'Aquarelle douce': {
        prompt: 'Transforme en aquarelle délicate avec dégradés fluides et couleurs pastels',
        strength: 0.7,
        model: 'seedance'
    },
    'Cyberpunk': {
        prompt: 'Version cyberpunk futuriste avec néons rose et bleu',
        strength: 0.9,
        model: 'seedream'
    },
    'Manga noir et blanc': {
        prompt: 'Style manga avec lignes noires épaisses et ombrages demi-tons',
        strength: 0.8,
        model: 'seedance'
    }
};

// Puis créer des boutons pour appliquer ces presets
function createPresetButtons() {
    const container = document.createElement('div');
    container.className = 'preset-buttons';
    
    Object.entries(PROMPT_PRESETS).forEach(([name, preset]) => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-small btn-secondary';
        btn.textContent = name;
        btn.onclick = () => applyPreset(preset);
        container.appendChild(btn);
    });
    
    DOM.promptInput.parentElement.appendChild(container);
}

function applyPreset(preset) {
    DOM.promptInput.value = preset.prompt;
    DOM.strengthSlider.value = preset.strength;
    DOM.strengthValue.textContent = preset.strength.toFixed(2);
    DOM.modelSelect.value = preset.model;
    AppState.strength = preset.strength;
    AppState.currentModel = preset.model;
    updateModelInfo();
    updateGenerateButton();
}

// Appeler dans init()
createPresetButtons();
```

### Ajouter une limite de caractères colorée

```javascript
// Dans initControls(), modifier l'event listener du prompt:
DOM.promptInput.addEventListener('input', (e) => {
    const length = e.target.value.length;
    DOM.charCount.textContent = length;
    
    // Colorer selon la longueur
    if (length < 10) {
        DOM.charCount.style.color = 'var(--danger)';
    } else if (length < 50) {
        DOM.charCount.style.color = 'var(--warning)';
    } else {
        DOM.charCount.style.color = 'var(--success)';
    }
    
    updateGenerateButton();
});
```

### Ajouter un historique local

```javascript
// Système d'historique
const TransformHistory = {
    items: [],
    maxItems: 10,
    
    add(params, result) {
        this.items.unshift({
            timestamp: Date.now(),
            params,
            result
        });
        
        if (this.items.length > this.maxItems) {
            this.items = this.items.slice(0, this.maxItems);
        }
        
        localStorage.setItem('transform-history', JSON.stringify(this.items));
    },
    
    load() {
        const saved = localStorage.getItem('transform-history');
        if (saved) {
            this.items = JSON.parse(saved);
        }
    },
    
    get(index) {
        return this.items[index];
    }
};

// Charger au démarrage
TransformHistory.load();

// Sauvegarder après chaque transformation
// Dans displayResult():
TransformHistory.add(getModelParameters(), imageUrl);
```

## 📊 Métriques et analytics

### Tracker les utilisations

```javascript
const Analytics = {
    data: {
        totalTransformations: 0,
        modelUsage: { seedance: 0, seedream: 0 },
        averageStrength: 0,
        popularRatios: {},
        sessionStartTime: Date.now()
    },
    
    track(event, data) {
        console.log('Analytics:', event, data);
        
        switch(event) {
            case 'transformation':
                this.data.totalTransformations++;
                this.data.modelUsage[data.model]++;
                
                if (!this.data.popularRatios[data.aspectRatio]) {
                    this.data.popularRatios[data.aspectRatio] = 0;
                }
                this.data.popularRatios[data.aspectRatio]++;
                break;
        }
        
        this.save();
    },
    
    save() {
        localStorage.setItem('app-analytics', JSON.stringify(this.data));
    },
    
    load() {
        const saved = localStorage.getItem('app-analytics');
        if (saved) {
            this.data = { ...this.data, ...JSON.parse(saved) };
        }
    },
    
    getReport() {
        return {
            ...this.data,
            sessionDuration: Date.now() - this.data.sessionStartTime
        };
    }
};

// Utiliser après chaque transformation
Analytics.track('transformation', {
    model: AppState.currentModel,
    aspectRatio: AppState.aspectRatio,
    strength: AppState.strength
});
```

## 🎓 Bonnes pratiques

### Prompts efficaces
1. **Soyez spécifique** : Plus de détails = meilleurs résultats
2. **Mentionnez le style** : Référencez des artistes, mouvements, ou techniques
3. **Décrivez l'ambiance** : Lumière, couleurs, émotions
4. **Incluez des détails techniques** : Composition, perspective, texture

### Choix du modèle
- **Seedance** : Idéal pour créativité et styles artistiques variés
- **Seedream** : Meilleur pour détails fins et haute résolution

### Réglage de la force
- **0.1-0.3** : Retouches subtiles, corrections légères
- **0.4-0.6** : Transformations modérées, bon équilibre
- **0.7-0.9** : Changements importants, très créatif
- **1.0** : Transformation maximale, peut perdre l'original

---

**💡 Conseil** : Expérimentez ! Chaque image réagit différemment aux transformations.