#!/bin/sh
for file in "constant" "linear" "logarithmic" "quadratic" "exponential" "comparison"
do
  docker run -ti --rm -v "$PWD":/data -w /data -u docker r-base Rscript "$file.r"
  npx svgo "$file.svg" -o "$file.svg"
done
