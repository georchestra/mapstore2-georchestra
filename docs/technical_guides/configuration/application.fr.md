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

Le visualiseur, le registre de plugins et l'éditeur de contexte sont configurés via des fichiers JSON stockés dans `mapstore/`. 
/!\  **Si un fichier est absent du répertoire de données (datadir georchestra), MapStore se replie sur la version embarquée dans la webapp d'origine.**
Si le fichier est présent dans le datadir georchestra c'est lui qui sera pris en compte dans la configuration du visualiseur.
Il est également possible  de "patcher" ces fichiers pour n'y stocker dans les fichiers .patch  que les paramètres spécifiques  à notre environnement.
### `localConfig.json`

C'est le fichier principal de configuration frontend. Il définit la configuration du visualiseur, la liste des plugins activés et les outils disponibles dans les pages d'administration.
Il est séparé en plusieurs sections où  sont définis les paramètres correspondants.


**//Paramètres  globaux**
```
{
   "proxyUrl":{
      "url":"proxy/?url=",
      "useCORS":[
         "https://georchestra.geo-solutions.it",
         "https://3d.sig.rennesmetropole.fr",ole.fr"
      ],
      "autoDetectCORS":true
   },
   "geoStoreUrl":"rest/geostore/",
   "printUrl":"pdf/info.json",
   "bingApiKey":"AhuXBu7ipR1gNbBfXhtUAyCZ6rkC5PkWpxs2MnMRZ1ZupxQfivjLCch22ozKSCAn",
   "forceDateFormat":"DD-MM-YYYY",
   "mapquestApiKey":"__API_KEY_MAPQUEST__",
   "apiKeys":{
      "googleStreetViewAPIKey":"xxxxxxx"
   },
  
      "maxURLLength":5000,
      "homePath":"/home"
   },
   ...
```
 **// paramètres globaux d'initilisation des plugins**
 ```
   "initialState":{
      "defaultState":{
         "print":{
            "spec":{
               "antiAliasing":true,
               "iconSize":24,
               "legendDpi":96,
               "fontFamily":"Verdana",
               "fontSize":8,
               "bold":false,
               "italic":false,
               "resolution":"96",
               "name":"Carte de Rennes Métropole",
               "description":"Impression standard",
               "sheet":"A4"
            }
         },

         "catalog":{
            "default":{
               "newService":{
                  "url":"",
                  "type":"wms",
                  "title":"",
                  "isNew":true,
                  "autoload":false
               },
               "selectedService":"localgn",
               "services":{
                  "localgn":{
                     "url":"/geonetwork/srv/fre/csw",
                     "type":"csw",
                     "title":"Catalogue Rennes Métropole",
                     "autoload":true,
                     "format": "image/png8",                                                    
                     "layerOptions":{
                        "tileSize":512,
                        "format":"image/png8"
                     },
                     "filter":{
                         "staticFilter":"<ogc:Or> <ogc:PropertyIsEqualTo matchCase='true'> <ogc:PropertyName>Type</ogc:PropertyName> <ogc:Literal>data</ogc:Literal> </ogc:PropertyIsEqualTo> <ogc:PropertyIsEqualTo matchCase='true'> <ogc:PropertyName>Type</ogc:PropertyName> <ogc:Literal>dataset</ogc:Literal> </ogc:PropertyIsEqualTo> <ogc:PropertyIsEqualTo matchCase='true'> <ogc:PropertyName>Type</ogc:PropertyName> <ogc:Literal>datasetcollection</ogc:Literal> </ogc:PropertyIsEqualTo> <ogc:PropertyIsEqualTo matchCase='true'> <ogc:PropertyName>Type</ogc:PropertyName> <ogc:Literal>series</ogc:Literal> </ogc:PropertyIsEqualTo> </ogc:Or>",
                          "dynamicFilter":"<ogc:Or> <ogc:PropertyIsLike matchCase='false' wildCard='*' singleChar='.' escapeChar='!'> <ogc:PropertyName>Title</ogc:PropertyName> <ogc:Literal>${searchText}*</ogc:Literal> </ogc:PropertyIsLike> <ogc:PropertyIsLike matchCase='false' wildCard='*' singleChar='.' escapeChar='!'> <ogc:PropertyName>AlternateTitle</ogc:PropertyName> <ogc:Literal>${searchText}*</ogc:Literal> </ogc:PropertyIsLike> <ogc:PropertyIsLike matchCase='false' wildCard='*' singleChar='.' escapeChar='!'> <ogc:PropertyName>Abstract</ogc:PropertyName> <ogc:Literal>${searchText}*</ogc:Literal> </ogc:PropertyIsLike> <ogc:PropertyIsLike matchCase='false' wildCard='*' singleChar='.' escapeChar='!'> <ogc:PropertyName>Subject</ogc:PropertyName> <ogc:Literal>${searchText}*</ogc:Literal> </ogc:PropertyIsLike> <ogc:PropertyIsLike matchCase='false' wildCard='*' singleChar='.' escapeChar='!'> <ogc:PropertyName>Description</ogc:PropertyName> <ogc:Literal>${searchText}*</ogc:Literal> </ogc:PropertyIsLike> </ogc:Or>"
                        },
                     "autoSetVisibilityLimits":true
                  },
...  

   },

```
**//plugins utilisés pour chaque environnement**
  ```
   "plugins":{
   ```
**//plugins utilisés pour les mobiles**
```
      "mobile":[
         "Header",
         "Easytheming",
         {
            "name":"Map",
            "cfg":{
               "mapOptions":{
                  "openlayers":{
                     "interactions":{
                        "pinchRotate":false,
                        "altShiftDragRotate":false
                     }
                  }
               }
            }
         },
 ...
      ],
```

**//plugins utilisés pour l'application web**

```
     "desktop":[
         "Header",
         "Easytheming",
         "Details",
         {
            "name":"MapTemplates",
            "cfg":{
               "allowedTemplates":[
                  {
                     "id":1102
                  },
                  {
                     "id":1112
                  },
                  {
                     "id":1122
                  },
                  {
                     "id":9690
                  }
               ]
            }
         },
          {
            "name":"LayerDownload",
            "cfg":{
               "formats":[
                  {
                     "name":"csv",
                     "label":"csv"
                  },
                  {
                     "name":"excel",
                     "label":"excel",
                     "validServices":[
                        "wfs",
                        "wps"
                     ]
                  },
                  {
                     "name":"excel2007",
                     "label":"excel2007"
                  }
               ],
               "srsList":[
                  {
                     "name":"native",
                     "label":"native (EPSG 3948)"
                  },
                  {
                     "name":"EPSG:4326",
                     "label":"latitude-longitude (WGS84)"
                  },
                  {
                     "name":"EPSG:3857",
                     "label":"EPSG 3857"
                  }
               ],
               "defaultSrs":"native"
            }
         },
 ....        
      ],
 ```

**//plugins utilisés pour les applications embedded**

```     
      "embedded":[
         "Details",
         "Easytheming",
         {
            "name":"Map",
            "cfg":{
               "mapOptions":{
                  "openlayers":{
                     "interactions":{
                        "pinchRotate":false,
                        "altShiftDragRotate":false
                     },
                     "attribution":{
                        "container":"#footer-attribution-container"
                     }
                  },
                  "leaflet":{
                     "attribution":{
                        "container":"#footer-attribution-container"
                     }
                  }
               },
               "toolsOptions":{
                  "scalebar":{
                     "container":"#footer-scalebar-container"
                  }
               }
            }
         },
 ....        
      ],
 ```
**//plugins utilisés communs**
      "common":[
         
      ],
```

**//paramétrage des cartes de la page home**

```
      "maps":[
         "Login",
         "Easytheming",
         "HomeDescription",
         "Fork",
         "MapSearch",
         "FeaturedMaps",
         "ContentTabs",
         {
            "name":"Header",
            "cfg":{
               "page":"mapstore-home"
            }
         },
         {
            "name":"Contexts",
            "cfg":{
               "mapsOptions":{
                  "start":0,
                  "limit":12
               },
               "fluid":true
            },
            "override":{
               "ContentTabs":{
                  "position":-1,
                  "key":"maps"
               }
            }
         }
      ],
```     
**//paramétrage des dashboards de la page home**
```
      "dashboard":[
         {
            "name":"OmniBar",
            "cfg":{
               "containerPosition":"header",
               "className":"navbar shadow navbar-home"
            }
         },
         "Details",
         "Easytheming",
         "AddWidgetDashboard",
         "MapConnectionDashboard",
         {
            "name":"SidebarMenu",
            "cfg":{
               "containerPosition":"columns"
            }
         },
         {
            "name":"Home",
            "override":{
               "OmniBar":{
                  "priority":5
               }
            }
         },
         {
            "name":"Login",
            "override":{
               "OmniBar":{
                  "priority":5
               }
            }
         },
         "Language",
         "NavMenu",
         "DashboardSave",
         "DashboardSaveAs",
         "DashboardExport",
         "DashboardImport",
         "DeleteDashboard",
         "Attribution",
         {
            "name":"Share",
            "cfg":{
               "showAPI":false,
               "advancedSettings":false,
               "shareUrlRegex":"(h[^#]*)#\\/dashboard\\/([A-Za-z0-9]*)",
               "shareUrlReplaceString":"$1dashboard-embedded.html#/$2",
               "embedOptions":{
                  "showTOCToggle":false,
                  "showConnectionsParamToggle":true,
                  "allowFullScreen":false,
                  "sizeOptions":{
                     "Small":{
                        "width":600,
                        "height":500
                     },
                     "Medium":{
                        "width":800,
                        "height":600
                     },
                     "Large":{
                        "width":1000,
                        "height":800
                     },
                     "Custom":{
                        "width":0,
                        "height":0
                     }
                  },
                  "selectedOption":"Small"
               }
            }
         },
         "Permalink",
         {
            "name":"DashboardEditor",
            "cfg":{
               "selectedService":"localgs",
               "services":{
                  "localgs":{
                     "url":"/geoserver/wms",
                     "type":"wms",
                     "title":"le geoserver local",
                     "autoload":true
                  }
               },
               "containerPosition":"columns"
            }
         },
         {
            "name":"QueryPanel",
            "cfg":{
               "toolsOptions":{
                  "hideCrossLayer":true,
                  "hideSpatialFilter":true
               },
               "containerPosition":"columns"
            }
         },
         "Dashboard",
         "Notifications",
         {
            "name":"Tutorial",
            "cfg":{
               "allowClicksThruHole":false,
               "containerPosition":"header",
               "preset":"dashboard_tutorial"
            }
         },
         {
            "name":"FeedbackMask",
            "cfg":{
               "containerPosition":"header"
            }
         }
      ],
```
**//paramétrages des dashboards embedded**
```
      "dashboard-embedded":[
         {
            "name":"Dashboard",
            "cfg":{
               "minLayoutWidth":768
            }
         },
         {
            "name":"FeedbackMask"
         }
      ],
```
**//paramétrage des geostories**
```
      "geostory":[
         {
            "name":"OmniBar",
            "cfg":{
               "containerPosition":"header",
               "className":"navbar shadow navbar-home"
            }
         {
            "name":"Share",
            "cfg":{
               "embedPanel":true,
               "showAPI":false,
               "embedOptions":{
                  "showTOCToggle":false,
                  "allowFullScreen":false
               },
               "shareUrlRegex":"(h[^#]*)#\\/geostory\\/([^\\/]*)\\/([A-Za-z0-9]*)",
               "shareUrlReplaceString":"$1geostory-embedded.html#/$3",
               "advancedSettings":{
                  "hideInTab":"embed",
                  "homeButton":true,
                  "sectionId":true
               }
            }
         },

      ],
...
}
```

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
