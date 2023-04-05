#!/bin/bash

baseDir=`dirname -- "$0"`;

cd $baseDir
npm run build

echo "Publish React App"
scp -r ./build/* david@tt-live.net:/opt/wildfly/welcome-content
