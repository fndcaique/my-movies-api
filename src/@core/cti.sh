#!/bin/sh

npx cti create "./src" -i '*spec.ts' -e 'testing' '__tests__' '@types' -b 

find . -name "index.ts.bak" -delete