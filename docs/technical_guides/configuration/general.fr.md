# Principes généraux de configuration

MapStore utilise la variable d'environnement standard de geOrchestra `georchestra.datadir` pour localiser le fichier `default.properties` et charger les paramètres mutualisés de l'infrastructure, comme la connexion à la base de données ou à LDAP.

MapStore active également son propre répertoire de données sous `georchestra.datadir/mapstore`. Ce sous-répertoire dédié contient les fichiers permettant de personnaliser l'application au-delà des réglages partagés de geOrchestra.
