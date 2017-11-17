const infoDrawerOwner = document.currentScript.ownerDocument;

class InfoDrawer extends HTMLElement {
    constructor() {
        super();
        // initialize any event listeners
    }
    connectedCallback() {
        const shadowRoot = this.attachShadow({mode: 'open'});
        const template = infoDrawerOwner.getElementById('info-drawer-template');
        const instance = template.content.cloneNode(true);
        shadowRoot.appendChild(instance);
        this.open = false;
        this.render();
    }
    render() {
        // any initial js -> dom manipulation needed 
        // accessing elements via this.shadowroot instead of document
        let btn = this.shadowRoot.getElementById('info-drawer-button');
        let drawer = this.shadowRoot.getElementById('info-drawer');
        let screen = this.shadowRoot.getElementById('info-drawer-screen');
        btn.addEventListener('click', e => {
            this.open = !this.open;
            if (this.open) {
                drawer.classList.add('open');
                screen.classList.add('open');
            } else {
                drawer.classList.remove('open');
                screen.classList.remove('open');
            }
        })
        screen.addEventListener('click', e => {
            this.open = false;
            drawer.classList.remove('open');
            screen.classList.remove('open');
        })
    }
}

customElements.define('info-drawer', InfoDrawer);
