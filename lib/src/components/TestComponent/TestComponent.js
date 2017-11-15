const runPy = require('../tools/runPy').runPy;
const testComponentOwner = document.currentScript.ownerDocument;

class TestComponent extends HTMLElement {
    constructor() {
        super();
        // initialize any event listeners
        this.addEventListener('click', e => this.action())
    }
    connectedCallback() {
        const shadowRoot = this.attachShadow({mode: 'open'});
        const template = testComponentOwner.getElementById('test-component-template');
        const instance = template.content.cloneNode(true);
        shadowRoot.appendChild(instance);
        this.greeting = this.getAttribute('greeting');
        this.render();
    }
    render() {
        // any initial js -> dom manipulation needed 
        // accessing elements via this.shadowroot instead of document
        this.shadowRoot.getElementById('greeting').innerText = this.greeting
    }
    action() {
        runPy('./lib/scripts/testScript.py', [this.greeting], console.log)
    }
}

customElements.define('test-component', TestComponent);
