const directoryInputOwner = document.currentScript.ownerDocument;

class DirectoryInput extends HTMLElement {
    constructor() {
        super();
        // initialize any event listeners
    }
    connectedCallback() {
        const shadowRoot = this.attachShadow({mode: 'open'});
        const template = directoryInputOwner.getElementById('directory-input-template');
        const instance = template.content.cloneNode(true);
        shadowRoot.appendChild(instance);
        this.onClick = eval(this.getAttribute('onclick'));
        this.render();
    }
    render() {
        // any initial js -> dom manipulation needed 
        // accessing elements via this.shadowroot instead of document
        let dirInput = this.shadowRoot.getElementById('directory-input');
        dirInput.addEventListener('click', (e) => {
            let dirPath = this.selectDirectory();
            this.dirPath = dirPath ? dirPath : this.dirPath;
            this.update();
        });
    }
    
    selectDirectory() {
        if (!remote.getCurrentWindow() || !remote.dialog) {
            return new Error('No window or dialog created');
        }
        let path = remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
            properties: ['openDirectory']
        });
        return path ? path[0] : null;
    }

    update() {
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
