#!/bin/sh

npm run cti create "./src" -i '*spec.ts' -b

# find . -name "index.ts.bak" -delete