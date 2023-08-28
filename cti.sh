#!/bin/sh

cd src

for value in `ls -d */`
do
  pnpm cti create "./src/$value" -i '*spec.ts' -b
done

# find . -name "index.ts.bak" -delete