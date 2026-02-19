# Utiliser une image Nginx légère pour servir les fichiers statiques
FROM nginx:alpine

# Copier tous les fichiers du projet dans le répertoire de Nginx
COPY . /usr/share/nginx/html

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]