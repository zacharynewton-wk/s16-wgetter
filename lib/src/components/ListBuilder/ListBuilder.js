const listBuilderOwner = document.currentScript.ownerDocument;

class ListBuilder extends HTMLElement {
    constructor() {
        super();
        // initialize any event listeners
    }
    connectedCallback() {
        const shadowRoot = this.attachShadow({mode: 'open'});
        const template = listBuilderOwner.getElementById('list-builder-template');
        const instance = template.content.cloneNode(true);
        shadowRoot.appendChild(instance);
        this.render();
    }
    render() {
        // any initial js -> dom manipulation needed 
        // accessing elements via this.shadowroot instead of document
    }
}

customElements.define('list-builder', ListBuilder);
