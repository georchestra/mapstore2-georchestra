# Configuration de la base de données

MapStore utilise la base PostgreSQL de geOrchestra pour stocker les ressources applicatives comme les cartes et les contextes. Un schéma dédié nommé `mapstore` est utilisé pour ces données.

Le schéma peut être créé et initialisé à l'aide des scripts SQL fournis dans le répertoire [`database/`](https://github.com/georchestra/mapstore2-georchestra/tree/master/database/).

## Paramètres de connexion

Les paramètres de connexion sont généralement hérités de `default.properties` dans geOrchestra puis injectés en interne dans des variables comme `${pgsqlHost}`.

## Surcharger la configuration base de données de MapStore

`mapstore/geostore.properties` contient les paramètres spécifiques à MapStore qui ne peuvent pas être lus directement depuis `default.properties`.

La propriété principale est :

- `pgsqlGeoStoreSchema` : schéma utilisé par MapStore, `mapstore` par défaut

Ce fichier peut aussi servir à surcharger les paramètres de connexion si MapStore doit utiliser une configuration de base différente du reste de la plateforme.
