# Guide utilisateur

MapStore est un framework (infrastructure logicielle) utilisé pour construire des applications WebGIS avec des outils avancés de visualisation de cartes et de données géospatiales.
geOrchestra intègre MapStore comme visualiseur principal pour la visualisation et le partage des données.

La documentation officielle de MapStore est disponible ici :
[mapstore.readthedocs.io](https://mapstore.readthedocs.io/en/latest/).
Elle fournit des informations générales sur les outils et les pages disponibles dans le produit amont.

Comme geOrchestra n'utilise MapStore que pour son visualiseur cartographique et ses interfaces d'administration, et non pour tout le périmètre fonctionnel du produit amont, certaines informations de la documentation officielle peuvent différer de ce qui est disponible ici.

Mapstore s'appuie sur 2 notions :

 - <strong>la carte</strong> : C'est le document géographique final. Elle se compose de couches de données, d'un niveau de zoom et d'un centrage précis. C'est ce que l'utilisateur consulte pour visualiser des données spécifiques.

 - <strong>le contexte</strong> : C'est une carte enrichie d’outils (impression, recherche, mesure, ...), pour produire une application, sa présentation peut être personnalisée. Elle a une URL propre.


Les sections amont suivantes restent particulièrement utiles :

- [Exploring maps / Construire une carte](https://mapstore.readthedocs.io/en/latest/user-guide/exploring-maps/)
- [Managing contexts / Utiliser les contextes](https://docs.mapstore.geosolutionsgroup.com/en/latest/user-guide/exploring-contexts/)

Utilisez cette section pour les pages orientées usage spécifiques à geOrchestra :

- [Prendre en main](getting_started.fr.md)
- [Administration fonctionnelle](fonctionnal_administration.md)
