#!/bin/sh

npx cti create "./src" -i '*spec.ts' -b 

find . -name "index.ts.bak" -delete