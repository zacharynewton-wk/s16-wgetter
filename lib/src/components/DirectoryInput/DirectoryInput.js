const directoryInputOwner = document.currentScript.ownerDocument;

class DirectoryInput extends HTMLElement {
    constructor() {
        super();
        // initialize any event listeners
        this.addEventListener('set', e => {
            this.setDirectory(e.detail.dirPath);
        })
    }
    static get observedAttributes() {return ['dir']}
    connectedCallback() {
        const shadowRoot = this.attachShadow({mode: 'open'});
        const template = directoryInputOwner.getElementById('directory-input-template');
        const instance = template.content.cloneNode(true);
        shadowRoot.appendChild(instance);
        this.render();
    }
    render() {
        // any initial js -> dom manipulation needed 
        // accessing elements via this.shadowroot instead of document
        let dirInput = this.shadowRoot.getElementById('directory-input');
        dirInput.addEventListener('click', (e) => {
            let dirPath = this.selectDirectory();
            this.dirPath = dirPath ? dirPath : this.dirPath;
            this.dispatchEvent(new CustomEvent('set', {detail: {dirPath: this.dirPath}}))
        });
        this.update();
    }

    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
        if (attributeName == 'dir') this.setDirectory(newValue);
    }
    
    selectDirectory() {
        if (!remote.getCurrentWindow() || !remote.dialog) {
            return new Error('No window or dialog created');
        }
        let path = remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
            properties: ['openDirectory', 'createDirectory']
        });
        return path ? path[0] : null;
    }

    setDirectory(dir) {
        this.dirPath = dir ? dir : this.dirPath;
        this.update();
    }

    update() {
        if (!this.shadowRoot) return;
        let dirDisplay = this.shadowRoot.getElementById('directory-display');
        if (!this.dirPath) {
            dirDisplay.innerText = 'Select Directory';
            dirDisplay.classList.add('empty');
        } else {
            dirDisplay.innerText = this.dirPath;
            dirDisplay.classList.remove('empty');
        }
    }
}

customElements.define('directory-input', DirectoryInput);
