const appOwner = document.currentScript.ownerDocument;

class App extends HTMLElement {
    constructor() {
        super();
        this.addEventListener('click', e => {
            this.action();
        })
    }
    connectedCallback() {
        const shadowRoot = this.attachShadow({mode: 'open'});
        const template = appOwner.getElementById('app-template');
        const instance = template.content.cloneNode(true);
        shadowRoot.appendChild(instance);
    }
    render() {
        // any initial js -> dom manipulation needed 
        // accessing elements via this.shadowroot instead of document
    }
    action() {
        console.log('App action called');
    }
}

customElements.define('my-app', App);