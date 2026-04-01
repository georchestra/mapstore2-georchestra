# Administration fonctionnelle

## Contexte 

Afin de répondre aux besoins de utilisateurs, il est possible de proposer des envrionnements de travail cartographique prédéfinis, ce sont les **contextes**.


Dans MapStore, un **contexte** est défini comme un **document JSON** qui regroupe trois éléments fondamentaux :

- Une **carte** (« map »).
- Des **outils** (« plugins »).
- Un **thème**.

### Caractéristiques principales

- **Création et Administration** :
  Un contexte ne peut être créé que par des **administrateurs** (possédant le rôle Mapstore admin) via l’interface du gestionnaire de contexte (`/admin/`).

- **Accès et Sécurité** :
  Chaque contexte possède sa propre **URL dédiée**. Son accès peut être restreint à des groupes d’utilisateurs spécifiques en fonction des rôles définis dans le LDAP de geOrchestra.

- **Stockage** :
  Les informations relatives au contexte sont stockées dans la **base de données** de l’application.

- **La Carte du contexte** :
  Il s’agit d’une carte générée spécialement pour ce contexte par un administrateur. Par défaut, elle utilise la configuration de base d’un nouveau contexte (`new.json`), mais elle est généralement personnalisée pour répondre à un cas d’usage précis.

- **Extensions** :
  Lors de la création, l’extension « Map » est imposée par défaut, mais d’autres fonctionnalités (liste des couches, recherche, zoom, etc.) peuvent être ajoutées via le fichier de configuration des plugins.

### Un contexte et plusieurs cartes

Pour répondre à des besoins spéficiques, plusieurs types de cartes peuvent être mobilisés dans un contexte.
Il faut utiliser le plugin **Map template**.

> **Pour approfondir** : L'utilisation des contextes est détaillée dans [Managing contexts / Utiliser les contextes](https://docs.mapstore.geosolutionsgroup.com/en/latest/user-guide/exploring-contexts/)


## Les différents types de cartes


Dans l’écosystème MapStore, les types de cartes peuvent être organisés selon une hiérarchie allant de la configuration structurelle à l’usage personnel de l’utilisateur :

### 1. Les cartes de configuration (Niveau Fondamental)
Ces cartes définissent le comportement de base de l’application :

- **La carte par défaut du visualiseur (`config.json`)** : Configuration globale de MapStore.

- **La carte par défaut d’un nouveau contexte (`new.json`)** : Base proposée lors de la création d’un nouveau contexte par un administrateur.

### 2. Les cartes administrées (Niveau Stratégique)
Créées par des experts pour des usages spécifiques :

- **La carte d’un contexte** : Générée spécialement pour un contexte, adaptée à un cas d’usage précis.

- **La carte modèle (map template)** : Gérée par un administrateur de contenu, elle permet d’afficher rapidement une thématique (ex : urbanisme, voirie) avec des métadonnées associées.

### 3. Les cartes utilisateurs (Niveau Opérationnel)
Cartes personnalisées ou sauvegardées par les agents :

- **Cartes du catalogue de cartes** : Cartes « filles » enregistrées via « Enregistrer sous », héritant des outils d’un contexte « père ».

- **La carte exportée (`map.json`)** : Carte personnalisée exportée sous forme de fichier JSON.

- **La carte de la session utilisateur** : Enregistrée automatiquement dans le cache (LocalStorage) du navigateur, propre à chaque contexte visité.

### 4. Typologie selon le contenu fonctionnel
Les cartes se distinguent aussi par leur composition :

- **Fond de plan référentiel** : Regroupe des couches stylées pour représenter la réalité du terrain.

- **Fond de plan référentiel composite** : Superposition d’au moins deux fonds de plan avec transparence (ex : plan de ville sur photo aérienne).

- **Carte modèle thématique** : Organise des couches SIG pour représenter des phénomènes liés à un métier précis.

> **Pour approfondir** : L'utilisation des cartes est détaillée dans [Exploring maps / Construire une carte](https://mapstore.readthedocs.io/en/latest/user-guide/exploring-maps/)


## Catalogue

Dans l’écosystème MapStore, la notion de **catalogue** désigne l’outil et l’interface permettant de **rechercher, consulter et charger des données géographiques** (couches) dans une carte.

### Points clés pour comprendre son fonctionnement et son utilité

#### 1. Un outil de recherche de données
Le catalogue est principalement utilisé pour **identifier des couches individuelles** avant de les ajouter à une composition cartographique. Il est recommandé d’utiliser le **« catalogue de métadonnées »**, qui offre des outils de recherche adaptés et permet de consulter le descriptif complet d’une donnée.

#### 2. Une extension du visualiseur
Techniquement, le catalogue est une **extension (plugin)** ajoutable à un contexte MapStore. Il s’affiche de deux manières dans l’interface :
- **L’onglet Catalogue** : Situé dans l’en-tête du portail, il permet une recherche globale.
- **Le bouton « Ajouter des données »** : Accessible dans le visualiseur cartographique (barre d’outils ou liste des couches), il ouvre une fenêtre pour requêter les catalogues disponibles.

#### 3. La diversité des sources
Il est possible de configurer plusieurs catalogues.

#### 4. Rôle dans la structure de la carte
Techniquement, une carte (document JSON) contient une **liste des catalogues autorisés**, permettant le chargement dynamique des données par l’utilisateur.

> **En résumé** : Le catalogue est la **porte d’entrée vers le patrimoine de données géographiques** disponibles sur le portail, facilitant leur découverte via les métadonnées avant intégration sur la carte.

