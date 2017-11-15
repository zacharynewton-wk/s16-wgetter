const testComponentOwner = document.currentScript.ownerDocument;

class TestComponent extends HTMLElement {
    constructor() {
        super();
        // initialize any event listeners
    }
    connectedCallback() {
        const shadowRoot = this.attachShadow({mode: 'open'});
        const template = testComponentOwner.getElementById('test-component-template');
        const instance = template.content.cloneNode(true);
        shadowRoot.appendChild(instance);
        const greeting = this.getAttribute('greeting');
        this.render(greeting);
    }
    render(greeting) {
        // any initial js -> dom manipulation needed 
        // accessing elements via this.shadowroot instead of document
        this.shadowRoot.getElementById('greeting').innerText = greeting
    }
}

customElements.define('test-component', TestComponent);
