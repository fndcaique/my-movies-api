#!/bin/sh

npx cti create "./src" -i '*spec.ts' -e 'testing' '__tests__'  -b 

find . -name "index.ts.bak" -delete