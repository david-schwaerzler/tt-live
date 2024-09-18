#!/bin/bash

# input files
migrationScripts="src/main/resources/migrations"
flywayProps="src/main/resources/flyway-production.properties"

# output files
current_time=`date "+%Y_%m_%d_%H_%M_%S"`
outputDir="target/export_$current_time"
dstMigrationScripts="$outputDir/migrations"

if [ ! -d  "$migrationScripts" ]; then
	echo "migration scripts don't exist: $migrationScripts"
    exit 1
fi

if [ ! -f  "$flywayProps" ]; then
	echo "flyway production props don't exist: $flywayProps"
    exit 1
fi


if [ -d "$outputDir" ]; then
    rm -rf $outputDir
fi

mkdir $outputDir
mkdir $dstMigrationScripts


if ! ls target/*.ear 1> /dev/null 2>&1; then
    echo "ear couldn't be found. Project needs to be build first"
    exit 1
fi

find "target" -name "*.ear" -maxdepth 1 -exec cp '{}' $outputDir \;

for filename in "$migrationScripts/V*__*.sql"; do
    cp $filename $dstMigrationScripts
done

cp $flywayProps $outputDir