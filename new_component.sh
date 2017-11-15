#!/bin/bash
CNAME="$1"
if [ -z $CNAME ]; then
    echo "Component Name required."
    exit
fi
DIR="./lib/src/components"
COMP_DIR="$DIR/$CNAME"
if [ -d "$COMP_DIR" ]; then
    echo ""
    printf "Component directory $COMP_DIR exists, replace with new component? (yes/no) "
    read confirmation
    if [ $confirmation != "yes" ]; then
        exit
    fi
    rm -rf "$COMP_DIR"
fi
mkdir "$COMP_DIR"
JS="$COMP_DIR/$CNAME.js"
touch "$JS"
CSS="$COMP_DIR/$CNAME.css"
touch "$CSS"
HTML="$COMP_DIR/$CNAME.html"
touch "$HTML"

LOWER_CNAME=$(echo "$CNAME" | awk '{print tolower($0)}')
FIRST_LOWER_CNAME="$(echo ${CNAME:0:1} | tr '[:upper:]' '[:lower:]')${CNAME:1}"
SNAKE_CNAME=$(echo "$FIRST_LOWER_CNAME" | sed 's/\([A-Z]\)/-\1/g' | awk '{print tolower($0)}')

cat > "$HTML" << HTML
<template id="${SNAKE_CNAME}-template">
    <link rel="stylesheet" href="lib/src/components/${CNAME}/${CNAME}.css">
    <div class="${SNAKE_CNAME}__div"></div>
</template>
<script src="./${CNAME}.js"></script>
HTML

cat > "$JS" << JS
const ${FIRST_LOWER_CNAME}Owner = document.currentScript.ownerDocument;

class ${CNAME} extends HTMLElement {
    constructor() {
        super();
        // initialize any event listeners
    }
    connectedCallback() {
        const shadowRoot = this.attachShadow({mode: 'open'});
        const template = testComponentOwner.getElementById('${SNAKE_CNAME}-template');
        const instance = template.content.cloneNode(true);
        shadowRoot.appendChild(instance);
        this.render();
    }
    render() {
        // any initial js -> dom manipulation needed 
        // accessing elements via this.shadowroot instead of document
    }
}

customElements.define('${SNAKE_CNAME}', ${CNAME});
JS

cat > "$CSS" << CSS
.${SNAKE_CNAME}__div {

}
CSS