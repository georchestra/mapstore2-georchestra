#!/bin/bash

set -e

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
VENV_DIR="$SCRIPT_DIR/venv_mkdocs"
MKDOCS_CONFIG="$SCRIPT_DIR/mkdocs.yml"

# Vérifier si le script est exécuté sous Windows
if [ -n "$WINDIR" ] || [ -n "$MSYSTEM" ]; then
    source "$VENV_DIR/Scripts/activate"
else
    source "$VENV_DIR/bin/activate"
fi

# on lance mkdocs
mkdocs serve --config-file "$MKDOCS_CONFIG"

# Désactiver l'environnement virtuel
deactivate
