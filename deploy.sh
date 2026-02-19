#!/bin/bash

# Script de déploiement automatique pour Render.com
# Usage: ./deploy.sh

echo "🚀 Déploiement AI Image Transform sur Render.com"
echo "================================================"
echo ""

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fonction pour afficher les étapes
step() {
    echo -e "${BLUE}▶${NC} $1"
}

success() {
    echo -e "${GREEN}✓${NC} $1"
}

warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

error() {
    echo -e "${RED}✗${NC} $1"
}

# Vérifier si Git est installé
step "Vérification de Git..."
if ! command -v git &> /dev/null; then
    error "Git n'est pas installé. Installez Git d'abord."
    exit 1
fi
success "Git installé"

# Vérifier si Docker est installé
step "Vérification de Docker..."
if ! command -v docker &> /dev/null; then
    warning "Docker n'est pas installé. Vous ne pourrez pas tester localement."
else
    success "Docker installé"
fi

# Vérifier si c'est un repo Git
step "Vérification du repository Git..."
if [ ! -d .git ]; then
    warning "Pas de repository Git détecté. Initialisation..."
    git init
    success "Git initialisé"
else
    success "Repository Git détecté"
fi

# Vérifier les fichiers Docker
step "Vérification des fichiers Docker..."
files=("Dockerfile" "nginx.conf" ".dockerignore" "render.yaml")
missing=0

for file in "${files[@]}"; do
    if [ ! -f "$file" ]; then
        error "Fichier manquant: $file"
        missing=1
    fi
done

if [ $missing -eq 1 ]; then
    error "Certains fichiers sont manquants. Vérifiez votre projet."
    exit 1
fi
success "Tous les fichiers Docker sont présents"

# Test Docker local (optionnel)
if command -v docker &> /dev/null; then
    echo ""
    read -p "Voulez-vous tester l'application localement avec Docker? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        step "Build de l'image Docker..."
        docker build -t ai-image-transform . || {
            error "Échec du build Docker"
            exit 1
        }
        success "Image Docker créée"
        
        step "Démarrage du conteneur..."
        docker run -d -p 8080:80 --name ai-transform-test ai-image-transform || {
            error "Échec du démarrage du conteneur"
            exit 1
        }
        success "Conteneur démarré"
        
        echo ""
        echo -e "${GREEN}✓ Application disponible sur:${NC} http://localhost:8080"
        echo ""
        read -p "Appuyez sur Entrée pour continuer (le conteneur sera arrêté)..." -r
        
        docker stop ai-transform-test > /dev/null 2>&1
        docker rm ai-transform-test > /dev/null 2>&1
        success "Conteneur de test nettoyé"
    fi
fi

# Ajouter tous les fichiers
step "Ajout des fichiers au staging Git..."
git add . || {
    error "Échec de l'ajout des fichiers"
    exit 1
}
success "Fichiers ajoutés"

# Commit
step "Création du commit..."
timestamp=$(date +"%Y-%m-%d %H:%M:%S")
git commit -m "Deploy: $timestamp - Ready for Render.com" || {
    warning "Rien à commiter (pas de changements)"
}

# Vérifier si une remote existe
step "Vérification de la remote Git..."
if git remote get-url origin &> /dev/null; then
    remote_url=$(git remote get-url origin)
    success "Remote détectée: $remote_url"
    
    echo ""
    read -p "Voulez-vous pusher vers GitHub? (Y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Nn]$ ]]; then
        step "Push vers GitHub..."
        git push origin main || git push origin master || {
            error "Échec du push. Vérifiez votre configuration Git."
            exit 1
        }
        success "Code pushé vers GitHub"
    fi
else
    warning "Aucune remote Git configurée"
    echo ""
    echo "Pour configurer la remote GitHub:"
    echo -e "${BLUE}git remote add origin https://github.com/VOTRE-USERNAME/VOTRE-REPO.git${NC}"
    echo -e "${BLUE}git push -u origin main${NC}"
fi

# Instructions finales
echo ""
echo "================================================"
echo -e "${GREEN}✓ Préparation terminée !${NC}"
echo "================================================"
echo ""
echo "📋 Prochaines étapes:"
echo ""
echo "1. Si pas encore fait, pushez vers GitHub:"
echo -e "   ${BLUE}git push origin main${NC}"
echo ""
echo "2. Allez sur Render.com:"
echo -e "   ${BLUE}https://render.com${NC}"
echo ""
echo "3. Créez un nouveau Web Service:"
echo "   - Cliquez sur 'New +' → 'Web Service'"
echo "   - Connectez votre repository GitHub"
echo "   - Render détectera automatiquement le Dockerfile"
echo "   - Cliquez sur 'Create Web Service'"
echo ""
echo "4. Attendez le déploiement (2-5 minutes)"
echo ""
echo "5. Votre application sera disponible sur:"
echo -e "   ${GREEN}https://VOTRE-APP.onrender.com${NC}"
echo ""
echo "================================================"
echo ""
echo "📚 Documentation complète:"
echo -e "   ${BLUE}cat DEPLOY_GUIDE.md${NC}"
echo ""
echo -e "${GREEN}🚀 Bon déploiement !${NC}"
echo ""