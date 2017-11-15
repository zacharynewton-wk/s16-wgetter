#!/bin/bash
CNAME="$1"
if [ -z $CNAME ]; then
    echo "Component Name required."
    exit
fi
DIR="./lib/src/components"
COMP_DIR="$DIR/$CNAME"
echo ""
printf "Permanently delete $CNAME? (yes/no) "
read confirmation
if [ $confirmation != "yes" ]; then
    exit
fi
rm -rf "$COMP_DIR"
HREF="\\.\\/$CNAME\\/$CNAME\\.html"
sed -in "/$HREF/d" "$DIR/components.html"
if [ -f "$DIR/components.htmln" ]; then
    rm "$DIR/components.htmln"
fi