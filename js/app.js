// ===========================
// Application State
// ===========================
const AppState = {
    currentImage: null,
    currentImageUrl: null,
    currentModel: 'seedance',
    aspectRatio: '1:1',
    strength: 0.8,
    gallery: [],
    isPuterInitialized: false
};

// ===========================
// DOM Elements
// ===========================
const DOM = {
    // Navigation
    navBtns: document.querySelectorAll('.nav-btn'),
    sections: document.querySelectorAll('.section'),
    
    // Upload
    uploadArea: document.getElementById('uploadArea'),
    imageInput: document.getElementById('imageInput'),
    selectImageBtn: document.getElementById('selectImageBtn'),
    changeImageBtn: document.getElementById('changeImageBtn'),
    imagePreview: document.getElementById('imagePreview'),
    previewImage: document.getElementById('previewImage'),
    
    // Controls
    controlsSection: document.getElementById('controlsSection'),
    modelSelect: document.getElementById('modelSelect'),
    modelInfo: document.getElementById('modelInfo'),
    promptInput: document.getElementById('promptInput'),
    charCount: document.getElementById('charCount'),
    strengthSlider: document.getElementById('strengthSlider'),
    strengthValue: document.getElementById('strengthValue'),
    ratioBtns: document.querySelectorAll('.ratio-btn'),
    generateBtn: document.getElementById('generateBtn'),
    
    // Progress
    progressContainer: document.getElementById('progressContainer'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    
    // Results
    resultSection: document.getElementById('resultSection'),
    resultImage: document.getElementById('resultImage'),
    downloadBtn: document.getElementById('downloadBtn'),
    saveToGalleryBtn: document.getElementById('saveToGalleryBtn'),
    newTransformBtn: document.getElementById('newTransformBtn'),
    
    // Gallery
    galleryGrid: document.getElementById('galleryGrid'),
    
    // Modal
    galleryModal: document.getElementById('galleryModal'),
    modalOverlay: document.getElementById('modalOverlay'),
    modalClose: document.getElementById('modalClose'),
    modalImage: document.getElementById('modalImage'),
    modalModel: document.getElementById('modalModel'),
    modalPrompt: document.getElementById('modalPrompt'),
    modalDate: document.getElementById('modalDate'),
    modalDownload: document.getElementById('modalDownload'),
    modalDelete: document.getElementById('modalDelete'),
    
    // Toast
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage')
};

// ===========================
// Puter.js Integration
// ===========================
async function initializePuter() {
    try {
        // Vérifier si Puter est disponible
        if (typeof puter === 'undefined') {
            console.log('ℹ️ Puter.js non chargé - utilisation du stockage local');
            AppState.isPuterInitialized = false;
            loadGalleryFromLocal();
            return false;
        }
        
        // Puter.js est gratuit et illimité - pas besoin de clés API!
        // L'authentification se fait automatiquement via le navigateur
        console.log('🔄 Initialisation de Puter.js...');
        
        // Vérifier si l'utilisateur est déjà connecté
        const isSignedIn = await puter.auth.isSignedIn();
        
        if (!isSignedIn) {
            console.log('🔐 L\'utilisateur n\'est pas connecté à Puter.js');
            AppState.isPuterInitialized = false;
            loadGalleryFromLocal();
            return false;
        }
        
        AppState.isPuterInitialized = true;
        console.log('✅ Puter.js connecté avec succès!');
        console.log('☁️ Stockage cloud illimité activé');
        
        // Charger la galerie depuis Puter
        await loadGalleryFromPuter();
        
        return true;
    } catch (error) {
        // Si l'utilisateur annule la connexion ou autre erreur
        console.log('ℹ️ Puter.js non utilisé - utilisation du stockage local');
        AppState.isPuterInitialized = false;
        
        // Utiliser le stockage local comme fallback
        loadGalleryFromLocal();
        return false;
    }
}

async function loadGalleryFromPuter() {
    try {
        // Lire le fichier de galerie depuis Puter Cloud (gratuit et illimité)
        const galleryFile = await puter.fs.read('ai-image-transform/gallery.json');
        const galleryData = JSON.parse(galleryFile);
        AppState.gallery = galleryData.items || [];
        console.log(`📂 ${AppState.gallery.length} image(s) chargée(s) depuis Puter Cloud`);
        renderGallery();
    } catch (error) {
        // Fichier n'existe pas encore (première utilisation)
        console.log('📂 Nouvelle galerie Puter créée');
        AppState.gallery = [];
        loadGalleryFromLocal(); // Importer depuis localStorage si disponible
    }
}

async function saveGalleryToPuter() {
    if (!AppState.isPuterInitialized) {
        saveGalleryToLocal();
        return;
    }
    
    try {
        const galleryData = JSON.stringify({ items: AppState.gallery }, null, 2);
        
        // Puter.js offre un stockage cloud gratuit et illimité
        await puter.fs.write('ai-image-transform/gallery.json', galleryData);
        
        console.log('☁️ Galerie sauvegardée dans Puter Cloud');
        
        // Sauvegarder aussi en local comme backup
        saveGalleryToLocal();
    } catch (error) {
        console.warn('⚠️ Erreur de sauvegarde Puter:', error.message);
        // Fallback sur localStorage
        saveGalleryToLocal();
    }
}

function loadGalleryFromLocal() {
    const savedGallery = localStorage.getItem('ai-image-gallery');
    if (savedGallery) {
        AppState.gallery = JSON.parse(savedGallery);
        renderGallery();
    }
}

function saveGalleryToLocal() {
    localStorage.setItem('ai-image-gallery', JSON.stringify(AppState.gallery));
}

// ===========================
// Navigation
// ===========================
function initNavigation() {
    DOM.navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSection = btn.getAttribute('data-section');
            
            // Update active nav button
            DOM.navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update active section
            DOM.sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });
}

// ===========================
// Image Upload
// ===========================
function initImageUpload() {
    // Click to select
    DOM.selectImageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        DOM.imageInput.click();
    });
    
    DOM.uploadArea.addEventListener('click', () => {
        DOM.imageInput.click();
    });
    
    // File input change
    DOM.imageInput.addEventListener('change', handleImageSelect);
    
    // Drag and drop
    DOM.uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        DOM.uploadArea.classList.add('dragover');
    });
    
    DOM.uploadArea.addEventListener('dragleave', () => {
        DOM.uploadArea.classList.remove('dragover');
    });
    
    DOM.uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        DOM.uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            handleImageFile(files[0]);
        }
    });
    
    // Change image button
    DOM.changeImageBtn.addEventListener('click', () => {
        DOM.imageInput.click();
    });
}

function handleImageSelect(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        handleImageFile(file);
    }
}

function handleImageFile(file) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
        AppState.currentImage = file;
        AppState.currentImageUrl = e.target.result;
        
        // Update preview
        DOM.previewImage.src = e.target.result;
        DOM.uploadArea.classList.add('hidden');
        DOM.imagePreview.classList.remove('hidden');
        
        // Enable generate button if prompt is filled
        updateGenerateButton();
        
        showToast('Image chargée avec succès', 'success');
    };
    
    reader.readAsDataURL(file);
}

// ===========================
// Controls
// ===========================
function initControls() {
    // Model selection
    DOM.modelSelect.addEventListener('change', (e) => {
        AppState.currentModel = e.target.value;
        updateModelInfo();
    });
    
    // Prompt input
    DOM.promptInput.addEventListener('input', (e) => {
        const length = e.target.value.length;
        DOM.charCount.textContent = length;
        updateGenerateButton();
    });
    
    // Strength slider
    DOM.strengthSlider.addEventListener('input', (e) => {
        AppState.strength = parseFloat(e.target.value);
        DOM.strengthValue.textContent = AppState.strength.toFixed(2);
    });
    
    // Aspect ratio buttons
    DOM.ratioBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            DOM.ratioBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            AppState.aspectRatio = btn.getAttribute('data-ratio');
        });
    });
    
    // Generate button
    DOM.generateBtn.addEventListener('click', generateTransformation);
    
    // Result buttons
    DOM.downloadBtn.addEventListener('click', downloadResult);
    DOM.saveToGalleryBtn.addEventListener('click', saveToGallery);
    DOM.newTransformBtn.addEventListener('click', resetForNewTransform);
}

function updateModelInfo() {
    const modelInfoText = {
        'seedance': 'Idéal pour des transformations créatives et artistiques',
        'seedream': 'Modèle haute performance pour des résultats détaillés en 2K',
        'nano-banana': 'Gemini 2.5 Image - Performance ultra-rapide'
    };
    
    const icon = DOM.modelInfo.querySelector('i');
    const span = DOM.modelInfo.querySelector('span');
    span.textContent = modelInfoText[AppState.currentModel];
}

function updateGenerateButton() {
    const hasImage = AppState.currentImageUrl !== null;
    const hasPrompt = DOM.promptInput.value.trim().length > 0;
    
    DOM.generateBtn.disabled = !(hasImage && hasPrompt);
}

// ===========================
// Image Generation
// ===========================
async function generateTransformation() {
    const prompt = DOM.promptInput.value.trim();
    
    if (!AppState.currentImageUrl || !prompt) {
        showToast('Veuillez charger une image et entrer une description', 'error');
        return;
    }
    
    // Disable button and show progress
    DOM.generateBtn.disabled = true;
    DOM.progressContainer.classList.remove('hidden');
    DOM.resultSection.classList.add('hidden');
    
    try {
        // Simulate progress
        updateProgress(10, 'Préparation de l\'image...');
        
        await new Promise(resolve => setTimeout(resolve, 500));
        updateProgress(30, 'Envoi vers le modèle IA...');
        
        // Préparer les paramètres selon le modèle
        const modelParams = getModelParameters();
        
        updateProgress(50, `Transformation en cours avec ${AppState.currentModel}...`);
        
        // Simuler l'appel à l'API (dans une vraie application, vous appelleriez l'API ici)
        // Pour la démo, on simule un délai et on réutilise l'image source avec un filtre
        const transformedImage = await simulateImageTransformation();
        
        updateProgress(90, 'Finalisation...');
        await new Promise(resolve => setTimeout(resolve, 500));
        
        updateProgress(100, 'Terminé !');
        
        // Display result
        displayResult(transformedImage);
        
        showToast('Transformation réussie !', 'success');
        
    } catch (error) {
        console.error('Erreur lors de la génération:', error);
        showToast('Erreur lors de la transformation', 'error');
    } finally {
        DOM.generateBtn.disabled = false;
        setTimeout(() => {
            DOM.progressContainer.classList.add('hidden');
            DOM.progressFill.style.width = '0%';
        }, 1000);
    }
}

function getModelParameters() {
    // Configuration spécifique selon le modèle
    const params = {
        model: AppState.currentModel,
        prompt: DOM.promptInput.value.trim(),
        image: AppState.currentImageUrl,
        aspectRatio: AppState.aspectRatio,
        strength: AppState.strength
    };
    
    if (AppState.currentModel === 'seedream') {
        params.resolution = '2k';
    }
    
    return params;
}

async function simulateImageTransformation() {
    // Appel réel à l'API Puter.js
    try {
        const prompt = DOM.promptInput.value.trim();
        const base64Image = AppState.currentImageUrl.split(',')[1];
        
        // Mapper les modèles fictifs vers les modèles réels de Puter.js
        let puterModel = "gemini-2.5-flash-image-preview"; // Par défaut
        if (AppState.currentModel === 'seedream') {
            puterModel = "gemini-2.5-flash-image-preview";
        } else if (AppState.currentModel === 'nano-banana') {
            puterModel = "gemini-2.5-flash-image-preview"; // Nano Banana n'est pas un modèle officiel Puter
        }

        const imageElement = await puter.ai.txt2img(prompt, {
            model: puterModel,
            input_image: base64Image,
            input_image_mime_type: AppState.currentImage.type
        });
        
        return imageElement.src;
    } catch (error) {
        console.error('Erreur Puter AI:', error);
        throw new Error('Erreur lors de la transformation avec Puter.js: ' + error.message);
    }
}

function updateProgress(percent, text) {
    DOM.progressFill.style.width = percent + '%';
    DOM.progressText.textContent = text;
}

function displayResult(imageUrl) {
    DOM.resultImage.src = imageUrl;
    DOM.resultSection.classList.remove('hidden');
    
    // Scroll to result
    DOM.resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===========================
// Result Actions
// ===========================
async function downloadResult() {
    const imageUrl = DOM.resultImage.src;
    
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `ai-transform-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showToast('Image téléchargée avec succès', 'success');
    } catch (error) {
        console.error('Erreur de téléchargement:', error);
        showToast('Erreur lors du téléchargement', 'error');
    }
}

async function saveToGallery() {
    const galleryItem = {
        id: Date.now(),
        imageUrl: DOM.resultImage.src,
        model: AppState.currentModel,
        prompt: DOM.promptInput.value.trim(),
        aspectRatio: AppState.aspectRatio,
        strength: AppState.strength,
        date: new Date().toISOString()
    };
    
    AppState.gallery.unshift(galleryItem);
    
    // Limiter la galerie à 50 items
    if (AppState.gallery.length > 50) {
        AppState.gallery = AppState.gallery.slice(0, 50);
    }
    
    // Sauvegarder
    await saveGalleryToPuter();
    
    renderGallery();
    showToast('Image ajoutée à la galerie', 'success');
}

function resetForNewTransform() {
    DOM.resultSection.classList.add('hidden');
    DOM.promptInput.value = '';
    DOM.charCount.textContent = '0';
    DOM.strengthSlider.value = '0.8';
    DOM.strengthValue.textContent = '0.8';
    AppState.strength = 0.8;
    updateGenerateButton();
}

// ===========================
// Gallery
// ===========================
function renderGallery() {
    if (AppState.gallery.length === 0) {
        DOM.galleryGrid.innerHTML = `
            <div class="gallery-empty">
                <i class="fas fa-image"></i>
                <p>Aucune image dans votre galerie</p>
                <p class="small">Créez votre première transformation pour commencer</p>
            </div>
        `;
        return;
    }
    
    DOM.galleryGrid.innerHTML = '';
    
    AppState.gallery.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'gallery-item';
        itemEl.innerHTML = `
            <img class="gallery-item-image" src="${item.imageUrl}" alt="Gallery item">
            <div class="gallery-item-info">
                <div class="gallery-item-model">${getModelDisplayName(item.model)}</div>
                <div class="gallery-item-prompt">${item.prompt}</div>
                <div class="gallery-item-date">${formatDate(item.date)}</div>
            </div>
        `;
        
        itemEl.addEventListener('click', () => openGalleryModal(item));
        
        DOM.galleryGrid.appendChild(itemEl);
    });
}

function getModelDisplayName(model) {
    const names = {
        'seedance': 'Seedance',
        'seedream': 'Seedream v4.5'
    };
    return names[model] || model;
}

function formatDate(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// ===========================
// Gallery Modal
// ===========================
let currentModalItem = null;

function openGalleryModal(item) {
    currentModalItem = item;
    
    DOM.modalImage.src = item.imageUrl;
    DOM.modalModel.textContent = getModelDisplayName(item.model);
    DOM.modalPrompt.textContent = item.prompt;
    DOM.modalDate.textContent = formatDate(item.date);
    
    DOM.galleryModal.classList.remove('hidden');
}

function closeGalleryModal() {
    DOM.galleryModal.classList.add('hidden');
    currentModalItem = null;
}

function initGalleryModal() {
    DOM.modalClose.addEventListener('click', closeGalleryModal);
    DOM.modalOverlay.addEventListener('click', closeGalleryModal);
    
    DOM.modalDownload.addEventListener('click', async () => {
        if (!currentModalItem) return;
        
        try {
            const response = await fetch(currentModalItem.imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `ai-transform-${currentModalItem.id}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            showToast('Image téléchargée', 'success');
        } catch (error) {
            showToast('Erreur de téléchargement', 'error');
        }
    });
    
    DOM.modalDelete.addEventListener('click', async () => {
        if (!currentModalItem) return;
        
        if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
            AppState.gallery = AppState.gallery.filter(item => item.id !== currentModalItem.id);
            await saveGalleryToPuter();
            renderGallery();
            closeGalleryModal();
            showToast('Image supprimée', 'success');
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !DOM.galleryModal.classList.contains('hidden')) {
            closeGalleryModal();
        }
    });
}

// ===========================
// Toast Notifications
// ===========================
function showToast(message, type = 'success') {
    DOM.toastMessage.textContent = message;
    DOM.toast.className = 'toast';
    
    if (type === 'error') {
        DOM.toast.classList.add('error');
    } else if (type === 'warning') {
        DOM.toast.classList.add('warning');
    }
    
    DOM.toast.classList.remove('hidden');
    
    setTimeout(() => {
        DOM.toast.classList.add('hidden');
    }, 3000);
}

// ===========================
// Initialization
// ===========================
async function init() {
    console.log('Initialisation de l\'application...');
    
    // Initialize all features (UI first)
    initNavigation();
    initImageUpload();
    initControls();
    initGalleryModal();
    
    // Initialize Puter (Async, don't block the UI)
    initializePuter().then(() => {
        console.log('Puter.js initialisé en arrière-plan');
        renderGallery();
    });
    

    
    console.log('Application prête !');
    
    // Show welcome message
    setTimeout(() => {
        showToast('Bienvenue ! Commencez par charger une image', 'success');
    }, 500);
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===========================
// Notes pour l'intégration API réelle
// ===========================
/*
IMPORTANT: Ce code contient une simulation pour la démo.
Pour utiliser les vraies API Seedance et Seedream:

1. Remplacer la fonction simulateImageTransformation() par un vrai appel API
2. Utiliser les endpoints appropriés pour chaque modèle
3. Gérer l'authentification API si nécessaire
4. Implémenter la gestion des erreurs réseau
5. Ajouter un système de crédits/quota si applicable

Exemple de structure pour l'appel API réel:

async function callSeedanceAPI(params) {
    const response = await fetch('https://api.seedance.ai/v1/transform', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
            image: params.image,
            prompt: params.prompt,
            strength: params.strength,
            aspect_ratio: params.aspectRatio
        })
    });
    
    if (!response.ok) {
        throw new Error('API Error: ' + response.statusText);
    }
    
    const result = await response.json();
    return result.output_url;
}

async function callSeedreamAPI(params) {
    const response = await fetch('https://api.seedream.ai/v4.5/transform', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
            image: params.image,
            prompt: params.prompt,
            strength: params.strength,
            aspect_ratio: params.aspectRatio,
            resolution: '2k'
        })
    });
    
    if (!response.ok) {
        throw new Error('API Error: ' + response.statusText);
    }
    
    const result = await response.json();
    return result.output_url;
}
*/
