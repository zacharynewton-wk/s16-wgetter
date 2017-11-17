const infoDrawerButtonOwner = document.currentScript.ownerDocument;

class InfoDrawerButton extends HTMLElement {
    constructor() {
        super();
        // initialize any event listeners
    }
    connectedCallback() {
        const shadowRoot = this.attachShadow({mode: 'open'});
        const template = infoDrawerButtonOwner.getElementById('info-drawer-button-template');
        const instance = template.content.cloneNode(true);
        shadowRoot.appendChild(instance);
        this.render();
    }
    render() {
        // any initial js -> dom manipulation needed 
        // accessing elements via this.shadowroot instead of document
    }
}

customElements.define('info-drawer-button', InfoDrawerButton);
