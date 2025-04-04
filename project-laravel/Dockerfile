# Utiliser une image PHP avec Composer et Node.js
FROM php:8.2-apache

# Installer les extensions PHP nécessaires
RUN docker-php-ext-install pdo pdo_mysql

# Copier les fichiers de Laravel
COPY . /var/www/html

# Installer les dépendances PHP et Node.js
RUN apt-get update && apt-get install -y unzip
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader
RUN apt-get install -y nodejs npm && npm install && npm run build

# Donner les bons droits aux fichiers
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Exposer le port 80
EXPOSE 80

# Démarrer Apache
CMD ["apache2-foreground"]
