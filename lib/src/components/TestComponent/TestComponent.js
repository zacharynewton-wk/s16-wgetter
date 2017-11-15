const currentDocument = document.currentScript.ownerDocument;

class TestComponent extends HTMLElement {
    constructor() {
        super();

        this.addEventListener('click', e => {
            this.action();
        })
    }
    connectedCallback() {
        const shadowRoot = this.attachShadow({mode: 'open'});
        const template = currentDocument.getElementById('test-component-template');
        const instance = template.cloneNode(true);
        shadowRoot.appendChild(instance);
        console.log(shadowRoot);
        const attribute = this.getAttribute('attribute');
        console.log(attribute);
        this.render();
    }
    render() {
        // any initial js -> dom manipulation needed 
        // accessing elements via this.shadowroot instead of document
    }
    action() {
        console.log('Test component action called');
    }
}

customElements.define('test-component', TestComponent);