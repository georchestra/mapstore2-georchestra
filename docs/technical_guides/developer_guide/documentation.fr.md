# Maintenance de la documentation

Cette documentation était historiquement maintenue avec Sphinx et déployée via Read the Docs.
Elle est désormais maintenue dans `/docs` avec MkDocs Material.

L'objectif de la migration est de conserver un contenu dans `/docs` aussi proche que possible de la source legacy `docs_v1/`, tout en adoptant la structure MkDocs utilisée par ce dépôt.

## Prérequis de build

Pour construire la documentation localement, il faut :

- Python et `pip`
- `make`
- les paquets Python nécessaires au build MkDocs

## Build local

Des vérifications locales restent utiles avant de publier des modifications.

Commandes typiques :

```console
mkdocs serve
```

ou pour un build de type production :

```console
mkdocs build
```

## Publication GitHub Pages

La publication GitHub Pages repose sur une branche de sortie dédiée :

- la source documentaire reste dans `docs/` sur la branche de travail
- le workflow GitHub Actions `docs-pages` construit le site MkDocs
- le site généré est copié dans `docs/` sur la branche `gh_page`

Le paramétrage attendu dans GitHub est :

- `Settings > Pages`
- `Source`: `Deploy from a branch`
- `Branch`: `gh_page`
- `Folder`: `/docs`

Ce mode correspond à une publication statique du site généré, et non à l'affichage direct des fichiers Markdown source.

## Traductions

Cette documentation est organisée avec des suffixes de langue comme `.en.md` et `.fr.md`, et le plugin MkDocs `i18n` assemble le site localisé.

Lors des modifications :

- garder les pages anglaises et françaises alignées
- garder les entrées de navigation aussi proches que possible de la structure legacy `docs_v1/`
- mettre à jour les libellés de navigation dans `mkdocs.yml` lors de l'ajout de pages
- stocker les images au plus près de la section qui les utilise

Tant que la migration n'est pas complètement terminée, `docs_v1/` reste la source legacy de référence.
