#!/bin/bash

scp -r ./target/ttlive-ear-0.0.1-SNAPSHOT.ear david@tt-live.net:~/wildfly-26.1.2.Final/standalone/deployments/
