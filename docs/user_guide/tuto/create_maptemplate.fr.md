# Comment créer une carte modèle dans Mapstore ?

On propose de créer la carte modèle en 3 étapes:

- créer la carte,
- la promouvoir en carte modèle,
- la rendre accessible aux utilisateurs de Mapstore.

![](./images/create_maptemplate.png)


## Etape 1 : créer une carte

![](./images/maptemplate1.png)

Depuis le visualiseur standard /mapstore, créer une carte :

- ajouter les données souhaitées dans la TOC (liste des couches),
- les organiser comme souhaitées : création de groupes de couches, ...
- ajouter les fonds de plans nécessaires (backgroundlayers).
- se positionner dans la carte à l'endroit voulu (emprise).
Une fois la carte prête l'exporter au format JSON.

![](./images/maptemplate12.png)

**_Résultat_** : on dispose d'un fichier map.json

## Etape 2: la promouvoir en carte modèle

Depuis n'importe quel contexte, intégrer la carte pour qu'elle soit promue en tant que carte modèle (map template).

- aller dans l'onglet "Applications",
- filtrer les objets pour ne voir que les contextes,

![](./images/maptemplate21.png)

- ouvrir n'importe quel contexte ( de préférence un contexte où l'on souhaite charger la carte modèle) en modification,
- sélectionner le plugin "Map Template"
- ouvrir la liste des cartes modèles

![](./images/maptemplate22.png)

- charger le fichier map.json,

![](./images/maptemplate23.png)

- renseigner les paramètres de la carte modèle et enregistrer 

![](./images/maptemplate24.png)

**_Résultat_** : la carte est chargée dans la base de données mapstore, elle apparait dans la liste des cartes modèles  et peut être utilisée dans n'importe quel contexte, et/ou dansle visualiseur standard (/mapstore).

![](./images/maptemplate25.png)

## Etape 3: la rendre accessible aux utilisateurs

### Depuis un contexte

Dans un contexte donné, on peut ajouter la carte dans le plugin "Map Template" en glissant simplement la carte modèle que l'on vient de créer dans la liste des cartes modèles utilisées par le contexte.

**_Noter_** : une mise à jour de la carte modèle s'appliquera automatiquement sur tous les contextes où elle est chargée.

![](./images/maptemplate31.png)

### Depuis le visualiseur standard

