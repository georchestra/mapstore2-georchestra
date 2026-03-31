# msIframe

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
