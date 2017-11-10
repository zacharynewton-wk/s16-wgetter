#!/bin/bash

DEPENDENCIES="https://github.com/Workiva/web-skin.git"

if [ ! -d "deps" ]; then
    echo "Creating deps directory"
    mkdir deps
fi

cd deps

for dep in "$DEPENDENCIES"; do
    dir=$(echo "$dep" | sed -E 's/.*\/([^\/]+)\.git$/\1 /')
    [ -d "deps" ] && echo "Yes"
    if [ -d "$dir" ]; then
        echo "Pulling $dir"
        cd "$dir"
        git pull
        cd ..
    else
        echo "Cloning $dir"
        git clone "$dep"
    fi
done