# Autres notes de configuration

## Intégration avec le répertoire de données geOrchestra

MapStore peut être configuré via le [répertoire de données geOrchestra](https://github.com/georchestra/datadir), en utilisant les mêmes mécanismes de configuration externalisée que dans MapStore amont.

Si le répertoire de données n'est pas configuré, l'application utilise ses valeurs internes. S'il est configuré mais que certains fichiers manquent, MapStore se replie sur les fichiers embarqués dans la webapp déployée.

Ce comportement est utile car il permet aux administrateurs de ne personnaliser que ce qui est nécessaire tout en simplifiant les montées de version.

La recommandation principale est :

- ne copier un fichier de configuration dans le répertoire de données que lorsqu'une personnalisation est réellement nécessaire

Cette précaution est particulièrement importante pour `localConfig.json`, car conserver une copie complète impose ensuite de fusionner manuellement les nouveaux plugins introduits par les versions futures.

## Configuration du bandeau

MapStore embarque le bandeau geOrchestra au-dessus des pages du visualiseur.

Les propriétés suivantes sont lues depuis `default.properties` :

- `headerHeight` : hauteur de l'application d'en-tête, `90px` par défaut
- `headerUrl` : URL de l'application d'en-tête, `/header/` par défaut

L'emplacement de `default.properties` est résolu via le paramètre standard `georchestra.datadir`. En développement local, l'option JVM ressemble généralement à :

```console
-Dgeorchestra.datadir=/etc/georchestra
```
