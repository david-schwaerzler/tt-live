#!/bin/bash

baseDir=`dirname -- "$0"`;
cd $baseDir
mvn install

echo "Publish Server"
scp -r ./target/ttlive-ear-0.0.1-SNAPSHOT.ear david@tt-live.net:/opt/wildfly/standalone/deployments/
