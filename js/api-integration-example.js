// ===========================
// EXEMPLE D'INTÉGRATION API RÉELLE
// ===========================
// Ce fichier montre comment intégrer les vraies API Seedance et Seedream
// Remplacez les fonctions correspondantes dans js/app.js

// ===========================
// Configuration API
// ===========================
const API_CONFIG = {
    // ⚠️ NE JAMAIS exposer vos clés API dans le code frontend en production
    // Utilisez un backend proxy ou des variables d'environnement
    SEEDANCE_KEY: 'votre_clé_seedance',
    SEEDREAM_KEY: 'votre_clé_seedream',
    
    endpoints: {
        seedance: 'https://api.seedance.ai/v1/image-to-image',
        seedream: 'https://api.seedream.ai/v4.5/image-to-image'
    },
    
    // Limites et quotas
    maxImageSize: 10 * 1024 * 1024, // 10 MB
    timeout: 60000, // 60 secondes
    maxRetries: 3
};

// ===========================
// Utilitaire : Upload vers service cloud
// ===========================
async function uploadImageToCloud(imageDataUrl) {
    try {
        // Convertir data URL en Blob
        const response = await fetch(imageDataUrl);
        const blob = await response.blob();
        
        // Créer FormData pour l'upload
        const formData = new FormData();
        formData.append('file', blob, 'image.png');
        
        // Upload vers votre service ou service temporaire
        const uploadResponse = await fetch('https://api.votre-service.com/upload', {
            method: 'POST',
            body: formData
        });
        
        if (!uploadResponse.ok) {
            throw new Error('Échec de l\'upload');
        }
        
        const result = await uploadResponse.json();
        return result.url; // URL publique de l'image
        
    } catch (error) {
        console.error('Erreur d\'upload:', error);
        throw new Error('Impossible d\'uploader l\'image');
    }
}

// ===========================
// API Seedance
// ===========================
async function callSeedanceAPI(params) {
    try {
        // Uploader l'image source
        const imageUrl = await uploadImageToCloud(params.image);
        
        const requestBody = {
            image_url: imageUrl,
            prompt: params.prompt,
            strength: params.strength,
            aspect_ratio: params.aspectRatio,
            // Paramètres supplémentaires Seedance
            num_inference_steps: 50,
            guidance_scale: 7.5
        };
        
        const response = await fetch(API_CONFIG.endpoints.seedance, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_CONFIG.SEEDANCE_KEY}`
            },
            body: JSON.stringify(requestBody),
            signal: AbortSignal.timeout(API_CONFIG.timeout)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `API Error: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Différentes structures possibles selon l'API
        return result.output_url || result.image_url || result.images?.[0];
        
    } catch (error) {
        console.error('Erreur API Seedance:', error);
        throw handleAPIError(error, 'Seedance');
    }
}

// ===========================
// API Seedream v4.5
// ===========================
async function callSeedreamAPI(params) {
    try {
        // Uploader l'image source
        const imageUrl = await uploadImageToCloud(params.image);
        
        const requestBody = {
            image_url: imageUrl,
            prompt: params.prompt,
            strength: params.strength,
            aspect_ratio: params.aspectRatio,
            // Paramètres spécifiques Seedream
            resolution: '2k',
            enable_high_quality: true,
            num_inference_steps: 30,
            guidance_scale: 7.0
        };
        
        const response = await fetch(API_CONFIG.endpoints.seedream, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_CONFIG.SEEDREAM_KEY}`
            },
            body: JSON.stringify(requestBody),
            signal: AbortSignal.timeout(API_CONFIG.timeout)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `API Error: ${response.status}`);
        }
        
        const result = await response.json();
        return result.output_url || result.image_url || result.images?.[0];
        
    } catch (error) {
        console.error('Erreur API Seedream:', error);
        throw handleAPIError(error, 'Seedream');
    }
}

// ===========================
// Fonction unifiée d'appel API
// ===========================
async function callImageTransformAPI(params, retryCount = 0) {
    try {
        let resultUrl;
        
        // Appeler l'API appropriée selon le modèle
        if (params.model === 'seedance') {
            resultUrl = await callSeedanceAPI(params);
        } else if (params.model === 'seedream') {
            resultUrl = await callSeedreamAPI(params);
        } else {
            throw new Error('Modèle non supporté');
        }
        
        // Vérifier que l'URL est valide
        if (!resultUrl || typeof resultUrl !== 'string') {
            throw new Error('URL de résultat invalide');
        }
        
        return resultUrl;
        
    } catch (error) {
        // Système de retry
        if (retryCount < API_CONFIG.maxRetries) {
            console.log(`Tentative ${retryCount + 1}/${API_CONFIG.maxRetries}`);
            await new Promise(resolve => setTimeout(resolve, 2000 * (retryCount + 1)));
            return callImageTransformAPI(params, retryCount + 1);
        }
        
        throw error;
    }
}

// ===========================
// Gestion des erreurs API
// ===========================
function handleAPIError(error, apiName) {
    // Erreurs réseau
    if (error.name === 'AbortError' || error.name === 'TimeoutError') {
        return new Error(`Délai d'attente dépassé pour ${apiName}. Réessayez.`);
    }
    
    // Erreurs API
    if (error.message.includes('401')) {
        return new Error(`Clé API ${apiName} invalide ou expirée`);
    }
    
    if (error.message.includes('429')) {
        return new Error(`Limite de requêtes ${apiName} atteinte. Attendez quelques minutes.`);
    }
    
    if (error.message.includes('402')) {
        return new Error(`Crédits ${apiName} insuffisants`);
    }
    
    if (error.message.includes('413')) {
        return new Error('Image trop volumineuse. Max 10 MB.');
    }
    
    // Erreur générique
    return new Error(`Erreur ${apiName}: ${error.message}`);
}

// ===========================
// REMPLACEMENT DANS app.js
// ===========================
/*
Dans js/app.js, fonction generateTransformation():

// AVANT (simulation):
const transformedImage = await simulateImageTransformation();

// APRÈS (API réelle):
const transformedImage = await callImageTransformAPI(getModelParameters());

*/

// ===========================
// Exemple avec polling (si l'API est asynchrone)
// ===========================
async function callAsyncAPI(params) {
    try {
        // 1. Soumettre la requête
        const submitResponse = await fetch(API_CONFIG.endpoints[params.model], {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_CONFIG[params.model.toUpperCase() + '_KEY']}`
            },
            body: JSON.stringify({
                image_url: await uploadImageToCloud(params.image),
                prompt: params.prompt,
                strength: params.strength
            })
        });
        
        const submitResult = await submitResponse.json();
        const taskId = submitResult.task_id || submitResult.id;
        
        // 2. Polling pour vérifier l'état
        let attempts = 0;
        const maxAttempts = 60; // 5 minutes max (5 secondes * 60)
        
        while (attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 5000)); // Attendre 5s
            
            const statusResponse = await fetch(
                `${API_CONFIG.endpoints[params.model]}/status/${taskId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${API_CONFIG[params.model.toUpperCase() + '_KEY']}`
                    }
                }
            );
            
            const status = await statusResponse.json();
            
            if (status.status === 'completed' || status.state === 'success') {
                return status.output_url || status.result_url;
            }
            
            if (status.status === 'failed' || status.state === 'error') {
                throw new Error(status.error || 'Transformation échouée');
            }
            
            // Mettre à jour la progression
            if (status.progress) {
                updateProgress(status.progress, `Traitement en cours: ${status.progress}%`);
            }
            
            attempts++;
        }
        
        throw new Error('Délai d\'attente maximum dépassé');
        
    } catch (error) {
        throw handleAPIError(error, params.model);
    }
}

// ===========================
// Alternative: Utiliser un backend proxy
// ===========================
/*
Pour plus de sécurité, créez un backend qui agit comme proxy:

Frontend (js/app.js):
async function callBackendProxy(params) {
    const response = await fetch('/api/transform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    });
    
    if (!response.ok) {
        throw new Error('Backend error');
    }
    
    return await response.json();
}

Backend (Node.js/Express):
app.post('/api/transform', async (req, res) => {
    try {
        const { model, image, prompt, strength, aspectRatio } = req.body;
        
        // Les clés API sont stockées côté serveur (sécurisé)
        const apiKey = process.env[`${model.toUpperCase()}_API_KEY`];
        
        // Appeler l'API IA
        const result = await callExternalAPI(model, {
            image, prompt, strength, aspectRatio
        }, apiKey);
        
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
*/

// ===========================
// Validation des paramètres
// ===========================
function validateTransformParams(params) {
    const errors = [];
    
    if (!params.image || !params.image.startsWith('data:image/')) {
        errors.push('Image invalide');
    }
    
    if (!params.prompt || params.prompt.trim().length < 3) {
        errors.push('Prompt trop court (minimum 3 caractères)');
    }
    
    if (params.strength < 0.1 || params.strength > 1.0) {
        errors.push('Force doit être entre 0.1 et 1.0');
    }
    
    if (!['1:1', '16:9', '9:16', '4:3'].includes(params.aspectRatio)) {
        errors.push('Format d\'image invalide');
    }
    
    if (errors.length > 0) {
        throw new Error('Paramètres invalides: ' + errors.join(', '));
    }
    
    return true;
}

// ===========================
// Export pour utilisation
// ===========================
// Si vous utilisez des modules ES6:
// export { callImageTransformAPI, callAsyncAPI, validateTransformParams };

console.log('✅ Exemples d\'intégration API chargés');
console.log('📖 Consultez ce fichier pour voir comment intégrer les vraies API');
console.log('⚠️ N\'oubliez pas de sécuriser vos clés API !');
