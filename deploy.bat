@echo off
REM Script de déploiement pour Windows
REM Usage: deploy.bat

echo.
echo ========================================
echo Deploiement AI Image Transform
echo ========================================
echo.

REM Verification de Git
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] Git n'est pas installe
    echo Installez Git depuis: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo [OK] Git installe

REM Verification de Docker
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ATTENTION] Docker n'est pas installe
    echo Vous pouvez continuer sans Docker
) else (
    echo [OK] Docker installe
)

REM Verification des fichiers
echo.
echo Verification des fichiers...
if not exist "Dockerfile" (
    echo [ERREUR] Dockerfile manquant
    pause
    exit /b 1
)
if not exist "nginx.conf" (
    echo [ERREUR] nginx.conf manquant
    pause
    exit /b 1
)
if not exist ".dockerignore" (
    echo [ERREUR] .dockerignore manquant
    pause
    exit /b 1
)
if not exist "render.yaml" (
    echo [ERREUR] render.yaml manquant
    pause
    exit /b 1
)
echo [OK] Tous les fichiers presents

REM Verification du repo Git
if not exist ".git" (
    echo.
    echo Initialisation de Git...
    git init
    echo [OK] Git initialise
)

REM Test Docker local (optionnel)
where docker >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo.
    set /p TEST_DOCKER="Voulez-vous tester avec Docker localement? (o/N): "
    if /i "%TEST_DOCKER%"=="o" (
        echo.
        echo Build de l'image Docker...
        docker build -t ai-image-transform .
        if %ERRORLEVEL% NEQ 0 (
            echo [ERREUR] Echec du build Docker
            pause
            exit /b 1
        )
        
        echo Demarrage du conteneur...
        docker run -d -p 8080:80 --name ai-transform-test ai-image-transform
        if %ERRORLEVEL% NEQ 0 (
            echo [ERREUR] Echec du demarrage
            pause
            exit /b 1
        )
        
        echo.
        echo [OK] Application disponible sur: http://localhost:8080
        echo.
        pause
        
        docker stop ai-transform-test >nul 2>nul
        docker rm ai-transform-test >nul 2>nul
        echo [OK] Conteneur de test nettoye
    )
)

REM Ajout des fichiers
echo.
echo Ajout des fichiers...
git add .
echo [OK] Fichiers ajoutes

REM Commit
echo.
echo Creation du commit...
git commit -m "Deploy: Ready for Render.com"
if %ERRORLEVEL% NEQ 0 (
    echo [ATTENTION] Rien a commiter
)

REM Verification de la remote
git remote get-url origin >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo.
    echo [OK] Remote GitHub detectee
    
    set /p PUSH_GIT="Voulez-vous pusher vers GitHub? (O/n): "
    if /i not "%PUSH_GIT%"=="n" (
        echo Push vers GitHub...
        git push origin main
        if %ERRORLEVEL% NEQ 0 (
            git push origin master
            if %ERRORLEVEL% NEQ 0 (
                echo [ERREUR] Echec du push
                pause
                exit /b 1
            )
        )
        echo [OK] Code pushe vers GitHub
    )
) else (
    echo.
    echo [ATTENTION] Aucune remote Git configuree
    echo.
    echo Pour configurer la remote GitHub:
    echo git remote add origin https://github.com/VOTRE-USERNAME/VOTRE-REPO.git
    echo git push -u origin main
)

REM Instructions finales
echo.
echo ========================================
echo [OK] Preparation terminee !
echo ========================================
echo.
echo Prochaines etapes:
echo.
echo 1. Si pas encore fait, pushez vers GitHub:
echo    git push origin main
echo.
echo 2. Allez sur Render.com:
echo    https://render.com
echo.
echo 3. Creez un nouveau Web Service:
echo    - Cliquez sur 'New +' puis 'Web Service'
echo    - Connectez votre repository GitHub
echo    - Render detectera automatiquement le Dockerfile
echo    - Cliquez sur 'Create Web Service'
echo.
echo 4. Attendez le deploiement (2-5 minutes)
echo.
echo 5. Votre application sera disponible sur:
echo    https://VOTRE-APP.onrender.com
echo.
echo ========================================
echo.
echo Documentation complete: DEPLOY_GUIDE.md
echo.
pause