Afin de répondre aux besoins de utilisateurs, il est possible de proposer des envrionnements de travail cartographique prédéfinis, ce sont les **contextes**.



# Contexte 

Dans MapStore, un **contexte** est défini comme un **document JSON** qui regroupe trois éléments fondamentaux :

- Une **carte** (« map »).
- Des **outils** (« plugins »).
- Un **thème**.

## Caractéristiques principales

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

## Un contexte et plusieurs cartes

Pour répondre à des besoins spéficiques, plusieurs types de cartes peuvent être mobilisés dans un contexte.
Il faut utiliser le plugin **Map template**.

> **Pour approfondir** : L'utilisation des contextes est détaillée dans [Managing contexts / Utiliser les contextes](https://docs.mapstore.geosolutionsgroup.com/en/latest/user-guide/exploring-contexts/)


# Les différents types de cartes


Dans l’écosystème MapStore, les types de cartes peuvent être organisés selon une hiérarchie allant de la configuration structurelle à l’usage personnel de l’utilisateur :

## 1. Les cartes de configuration (Niveau Fondamental)
Ces cartes définissent le comportement de base de l’application :

- **La carte par défaut du visualiseur (`config.json`)** : Configuration globale de MapStore.

- **La carte par défaut d’un nouveau contexte (`new.json`)** : Base proposée lors de la création d’un nouveau contexte par un administrateur.

## 2. Les cartes administrées (Niveau Stratégique)
Créées par des experts pour des usages spécifiques :

- **La carte d’un contexte** : Générée spécialement pour un contexte, adaptée à un cas d’usage précis.

- **La carte modèle (map template)** : Gérée par un administrateur de contenu, elle permet d’afficher rapidement une thématique (ex : urbanisme, voirie) avec des métadonnées associées.

## 3. Les cartes utilisateurs (Niveau Opérationnel)
Cartes personnalisées ou sauvegardées par les agents :

- **Cartes du catalogue de cartes** : Cartes « filles » enregistrées via « Enregistrer sous », héritant des outils d’un contexte « père ».

- **La carte exportée (`map.json`)** : Carte personnalisée exportée sous forme de fichier JSON.

- **La carte de la session utilisateur** : Enregistrée automatiquement dans le cache (LocalStorage) du navigateur, propre à chaque contexte visité.

## 4. Typologie selon le contenu fonctionnel
Les cartes se distinguent aussi par leur composition :

- **Fond de plan référentiel** : Regroupe des couches stylées pour représenter la réalité du terrain.

- **Fond de plan référentiel composite** : Superposition d’au moins deux fonds de plan avec transparence (ex : plan de ville sur photo aérienne).

- **Carte modèle thématique** : Organise des couches SIG pour représenter des phénomènes liés à un métier précis.

> **Pour approfondir** : L'utilisation des cartes est détaillée dans [Exploring maps / Construire une carte](https://mapstore.readthedocs.io/en/latest/user-guide/exploring-maps/)


# Catalogue

Dans l’écosystème MapStore, la notion de **catalogue** désigne l’outil et l’interface permettant de **rechercher, consulter et charger des données géographiques** (couches) dans une carte.

## Points clés pour comprendre son fonctionnement et son utilité

### 1. Un outil de recherche de données
Le catalogue est principalement utilisé pour **identifier des couches individuelles** avant de les ajouter à une composition cartographique. Il est recommandé d’utiliser le **« catalogue de métadonnées »**, qui offre des outils de recherche adaptés et permet de consulter le descriptif complet d’une donnée.

### 2. Une extension du visualiseur
Techniquement, le catalogue est une **extension (plugin)** ajoutable à un contexte MapStore. Il s’affiche de deux manières dans l’interface :
- **L’onglet Catalogue** : Situé dans l’en-tête du portail, il permet une recherche globale.
- **Le bouton « Ajouter des données »** : Accessible dans le visualiseur cartographique (barre d’outils ou liste des couches), il ouvre une fenêtre pour requêter les catalogues disponibles.

### 3. La diversité des sources
Il est possible de configurer plusieurs catalogues.

### 4. Rôle dans la structure de la carte
Techniquement, une carte (document JSON) contient une **liste des catalogues autorisés**, permettant le chargement dynamique des données par l’utilisateur.

> **En résumé** : Le catalogue est la **porte d’entrée vers le patrimoine de données géographiques** disponibles sur le portail, facilitant leur découverte via les métadonnées avant intégration sur la carte.


# Créer une iFrame avec MapStore : msIframe

`msIframe` est un mécanisme de mapping d'URL GET simples utilisé pour configurer MapStore2 dans une iframe.

Il simplifie l'usage des iframes sur des sites externes, par exemple pour des pages de communication. Il reprend une logique de paramètres proche de `sViewer`, ce qui rend les URL d'iframe plus simples à produire.

## Paramètres KVP

### `c` `{string}`

Nom du contexte à utiliser pour l'iframe. S'il n'est pas fourni, la valeur configurée dans `defaultContext` est utilisée.

Exemple :

```text
http://sdi.georchestra.org/mapstore/msIframe/?c=Iframe
```

### `x` `{integer}`, `y` `{integer}`, `z` `{integer}`

Centre la carte sur `x,y` dans les unités du SRS du contexte et applique le facteur de zoom `z`.

Exemple :

```text
http://sdi.georchestra.org/mapstore/msIframe/?x=-366959&y=2951352&z=5
```

### `lb` `{integer}`

Affiche la couche de fond correspondant à son index. Par exemple, `lb=0` affiche la première couche de fond configurée.
Si ce paramètre n'est pas fourni, la couche de fond par défaut du contexte est utilisée.

Exemple :

```text
http://sdi.georchestra.org/mapstore/msIframe/?lb=1
```

### `layers` `{string}`

Liste de noms de couches geOrchestra séparés par des virgules, avec leur namespace.
C'est la manière la plus rapide d'initialiser une carte car elle s'appuie sur les catalogues définis dans le contexte.

Cela suppose que :

- les couches sont fournies par l'un des catalogues du contexte
- les couches sont interrogeables avec `INFO_FORMAT=text/html`
- les couches disposent de modèles HTML associés

Exemple :

```text
http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi
```

Il est aussi possible de surcharger le titre affiché dans la table des matières en ajoutant `~title` :

```text
http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi~Un titre personnalisé
```

Pour choisir un catalogue alternatif pour une couche, ajouter `*catalogid` :

```text
http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi*localgs
```

Pour choisir un style alternatif, ajouter `**stylename` lorsqu'aucun catalogue alternatif n'est précisé, ou utiliser `layer*catalog*style` :

```text
http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi**geor_sdi
```

Pour ajouter un `CQL_FILTER` fournisseur, ajouter `***cql_filter` lorsqu'aucun catalogue ni style alternatif n'est précisé, ou utiliser `layer*catalog*style*cql_filter` :

```text
http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi*localgs*geor_sdi*title%3DPIGMA
http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi***title%3DPIGMA
```

Les valeurs de `CQL_FILTER` doivent être encodées dans l'URL.

### `s` `{string}`

Ce paramètre exécute une requête `GetFeature` sur la couche indiquée, puis une requête `GetFeatureInfo` en utilisant un point extrait de la géométrie de l'entité récupérée.

La première coordonnée de la géométrie de la première entité retournée est réutilisée pour une requête WMS `GetFeatureInfo` standard limitée à la couche concernée.
Un `cql_filter` est requis afin que le même filtre soit appliqué à la fois à la requête `GetFeature` et à la requête `GetFeatureInfo`.
S'il n'est pas nécessaire d'appliquer un filtre métier, vous pouvez utiliser `INCLUDE`.

Utiliser `*` pour séparer le nom de couche et le `cql_filter`.

Exemples :

```text
http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi&s=geor:sdi*id%3D1
http://sdi.georchestra.org/mapstore/msIframe/?layers=geor:sdi&s=geor:sdi*INCLUDE
```

Des problèmes d'affichage de popup peuvent survenir selon la configuration de l'identifiant de couche. Si nécessaire, configurer l'identifiant avec `showInMapPopup` positionné à `false`.

## Dépannage

Si la console développeur du navigateur affiche un message proche de :

```text
Refused to display '' in a frame because it set 'X-Frame-Options' to 'deny'.
```

alors l'en-tête `X-Frame-Options` doit être masqué pour les requêtes MapStore.

Par exemple avec nginx :

```nginx
proxy_hide_header X-Frame-Options;
```
