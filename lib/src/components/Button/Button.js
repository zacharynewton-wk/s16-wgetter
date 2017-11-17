const buttonOwner = document.currentScript.ownerDocument;

class Button extends HTMLElement {
    constructor() {
        super();
        // initialize any event listeners
    }
    connectedCallback() {
        const shadowRoot = this.attachShadow({mode: 'open'});
        const template = buttonOwner.getElementById('button-template');
        const instance = template.content.cloneNode(true);
        shadowRoot.appendChild(instance);
        this.render();
    }
    render() {
        // any initial js -> dom manipulation needed 
        // accessing elements via this.shadowroot instead of document
        const btn = this.shadowRoot.getElementById('btn');
        for (let i = 0; i < this.classList.length; i++) {
            btn.classList.add(this.classList.item(i))
        }
        // btn.onclick = this.onclick;
        btn.innerHTML = this.innerHTML;
    }
}

customElements.define('app-button', Button);
