# Guide de configuration

MapStore2 pour geOrchestra se configure via le [répertoire de données geOrchestra](https://github.com/georchestra/datadir).

Les paramètres de base pour la base de données et LDAP sont généralement fournis par `default.properties` à la racine du répertoire déclaré. Les fichiers spécifiques à MapStore se trouvent dans le sous-répertoire `mapstore/` et couvrent les services backend, la configuration JSON du frontend et certains comportements avancés à l'exécution.

Cette section décrit :

- le rôle général de `georchestra.datadir`
- les paramètres propres à la base de données
- les fichiers de configuration applicative stockés dans `mapstore/`
- les détails d'intégration et les mécanismes de repli
