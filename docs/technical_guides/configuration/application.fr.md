# Configuration applicative

Le dossier `mapstore/` situé dans le répertoire de configuration geOrchestra contient les fichiers utilisés pour configurer les services backend et le visualiseur frontend.

## Services backend

MapStore embarque des services backend pour des fonctions comme l'impression et le proxy vers des services externes.

### Impression

Le répertoire `mapstore/printing/` contient la configuration du module d'impression. Ce module étend MapFish Print v2 avec des personnalisations spécifiques à MapStore.

Plus d'informations dans la documentation MapStore :

- [Paramètres du module d'impression](https://mapstore.readthedocs.io/en/latest/developer-guide/printing-module/#print-settings)

### Proxy

MapStore inclut un proxy interne sécurisé utilisé pour accéder à des services externes comme des flux WMS ou WMTS.

Le fichier `proxy.properties` contient la configuration du proxy. Voir :

- [Configuring Http Proxy](https://github.com/geosolutions-it/http-proxy/wiki/Configuring-Http-Proxy)

## Visualiseur cartographique

Le visualiseur, le registre de plugins et l'éditeur de contexte sont configurés via des fichiers JSON stockés dans `mapstore/`. Si un fichier est absent du répertoire de données, MapStore se replie sur la version embarquée dans la webapp d'origine.

### `localConfig.json`

Fichier principal de configuration frontend. Il définit la configuration du visualiseur, la liste des plugins activés et les outils disponibles dans les pages d'administration.

Référence :

- [Local config](https://mapstore.readthedocs.io/en/latest/developer-guide/local-config/)

### `config.json`

Configuration de la carte par défaut, y compris l'emprise initiale et les couches chargées au démarrage.

Référence :

- [Map options](https://mapstore.readthedocs.io/en/latest/developer-guide/maps-configuration/#map-options)

### `new.json`

Définition initiale de carte utilisée lors de la création d'un nouveau contexte dans l'éditeur.

Référence :

- [Map options](https://mapstore.readthedocs.io/en/latest/developer-guide/maps-configuration/#map-options)

### `pluginsConfig.json`

Registre JSON des plugins disponibles. Il contrôle la liste des plugins pouvant être sélectionnés dans l'éditeur de contexte.

Référence :

- [Context editor config](https://mapstore.readthedocs.io/en/latest/developer-guide/context-editor-config/)

## Comportements avancés du visualiseur

### Fichiers de patch

Des fichiers comme `localConfig.json` et `pluginsConfig.json` évoluent souvent entre deux versions. Pour isoler les personnalisations locales des fichiers fournis en standard, MapStore prend en charge des fichiers `.patch` qui ne contiennent que les différences à appliquer.

La configuration finale est assemblée dynamiquement par l'application quand le fichier est demandé en HTTP.

Référence :

- [Patching front-end configuration](https://mapstore.readthedocs.io/en/latest/developer-guide/externalized-configuration/#patching-front-end-configuration)

### Fichiers dynamiques

Quand des extensions sont installées depuis l'interface d'administration, MapStore écrit des fichiers supplémentaires dans le répertoire de données :

- `extensions.json` : registre JSON des extensions installées
- `dist/` : ressources des extensions téléversées
- `pluginsConfig.json.patch` : patch reflétant l'ajout de plugins

Pour stocker ces fichiers ailleurs, définissez l'option JVM `georchestra.extensions`. Si elle n'est pas définie, MapStore les stocke dans le répertoire de configuration standard.

### Répertoires de configuration multiples

MapStore peut lire plusieurs répertoires de configuration en déclarant plusieurs valeurs séparées par des virgules dans `georchestra.datadir`.

Les règles sont les suivantes :

- en lecture, le premier fichier correspondant trouvé est utilisé
- en écriture, seul le premier répertoire est utilisé

Cela permet de combiner un répertoire inscriptible géré par l'application avec un ou plusieurs répertoires en lecture seule maintenus manuellement par les administrateurs.
