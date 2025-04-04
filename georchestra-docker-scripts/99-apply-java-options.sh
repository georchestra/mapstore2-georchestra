#!/bin/sh
# JAVA_OPTIONS gives the ability to add more parameters to JAVA_OPTS at runtime.

# Exit immediately if a command exits with a non-zero status.
set -e

# Check if JAVA_OPTIONS is set and not empty
if [ -n "$JAVA_OPTIONS" ]; then
  echo "Applying runtime JAVA_OPTIONS: $JAVA_OPTIONS"
  # Append JAVA_OPTIONS to JAVA_OPTS
  export JAVA_OPTS="${JAVA_OPTS} $JAVA_OPTIONS"
fi
