#!/bin/bash

# This script sets up MkDocs for the geOrchestra documentation template

# Exit on error
set -e

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
DOCS_DIR="$SCRIPT_DIR/docs"
VENV_DIR="$SCRIPT_DIR/venv_mkdocs"
REQUIREMENTS_FILE="$SCRIPT_DIR/mkdocs_requirements.txt"

echo "Checking Python and Python version"

# Try to find a suitable Python executable
PYTHON_BIN=""

# Function to compare Python versions
version_ge() {
  # Compare two versions, returns 0 if $1 >= $2
  [ "$(printf '%s\n' "$1" "$2" | sort -V | head -n1)" = "$2" ]
}

# Check for python or python3
for cmd in python python3; do
  if command -v $cmd >/dev/null 2>&1; then
    VERSION=$($cmd -c 'import sys; print(".".join(map(str, sys.version_info[:3])))')
    if version_ge "$VERSION" "3.11"; then
      PYTHON_BIN=$cmd
      break
    fi
  fi
done

if [ -z "$PYTHON_BIN" ]; then
  echo "Python 3.11+ not found. Please install a suitable version."
  exit 1
fi

# Python found !
echo "Using $PYTHON_BIN (version $VERSION)"

if [ ! -d "$DOCS_DIR" ]; then
  echo "Documentation directory not found: $DOCS_DIR"
  exit 1
fi

# Create the virtual environment
$PYTHON_BIN -m venv "$VENV_DIR"
echo "Virtual environment created in $VENV_DIR/"

# Activate the venv
if [ -n "$WINDIR" ] || [ -n "$MSYSTEM" ]; then
    echo "Sorry : you are on Windows"
    source "$VENV_DIR/Scripts/activate"
else
    source "$VENV_DIR/bin/activate"
fi

# Install MkDocs and required plugins
echo "Installing MkDocs and plugins..."
python -m pip install -r "$REQUIREMENTS_FILE"
python -m pip list

echo ""
echo "======================================================================="
echo ""
echo ""

# Check if MkDocs was installed successfully
if ! mkdocs --version &> /dev/null; then
    echo "Error: MkDocs installation failed"
    exit 1
fi

# Desactivate the venv
deactivate

echo "MkDocs setup complete. "
echo "Documentation source directory: $DOCS_DIR"
echo "Please now run 'mkdocs_run.sh' to serve the documentation"
