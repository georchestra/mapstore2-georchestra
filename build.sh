#!/bin/bash
set -e

export GITREV=`git log -1 --format="%H"`
export VERSION="SNAPSHOT-$GITREV"

npm install --no-save
npm run compile
npm run lint

# running karma tests require chrome
if [ -n "$(which chrome)" ]
  then
    npm test
fi

if [ $# -eq 0 ]
  then
    mvn clean install -Dmapstore2.version=$VERSION
  else
    mvn clean install -Dmapstore2.version=$1
fi
