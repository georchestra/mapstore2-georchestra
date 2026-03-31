# Documentation Maintenance

This documentation was originally maintained with Sphinx and deployed through Read the Docs.
It is now maintained in `/docs` with MkDocs Material.

The migration goal is to keep the content of `/docs` as close as possible to the legacy `docs_v1/` source while adopting the MkDocs structure used by this repository.

## Build prerequisites

To build the documentation locally you need:

- Python and `pip`
- `make`
- the Python packages required for the MkDocs build

## Local build

Local checks are useful before publishing changes.

Typical commands:

```console
mkdocs serve
```

or for a production-style build:

```console
mkdocs build
```

## GitHub Pages publishing

GitHub Pages publishing relies on a dedicated output branch:

- the documentation source stays in `docs/` on the working branch
- the `docs-pages` GitHub Actions workflow builds the MkDocs site
- the generated site is copied to `docs/` on the `gh_page` branch

The expected GitHub setting is:

- `Settings > Pages`
- `Source`: `Deploy from a branch`
- `Branch`: `gh_page`
- `Folder`: `/docs`

This mode publishes the generated static site, not the raw Markdown sources.

## Translations

This documentation is organized with language suffixes such as `.en.md` and `.fr.md`, and the MkDocs `i18n` plugin assembles the localized site.

When editing content:

- keep the English and French pages aligned
- keep the navigation entries close to the legacy `docs_v1/` structure whenever possible
- update navigation labels in `mkdocs.yml` when adding pages
- store images next to the section that uses them

Until the migration is fully complete, `docs_v1/` remains the legacy reference source.
