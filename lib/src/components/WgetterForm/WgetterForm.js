const remote = require('electron').remote;
const wgetterFormOwner = document.currentScript.ownerDocument;

class WgetterForm extends HTMLElement {
    constructor() {
        super();
        // initialize any event listeners
    }
    connectedCallback() {
        const shadowRoot = this.attachShadow({mode: 'open'});
        const template = wgetterFormOwner.getElementById('wgetter-form-template');
        const instance = template.content.cloneNode(true);
        shadowRoot.appendChild(instance);
        this.render();
    }
    render() {
        // any initial js -> dom manipulation needed 
        // accessing elements via this.shadowroot instead of document
        let downloadBtn = this.shadowRoot.getElementById('download-button');
        downloadBtn.addEventListener('click', e => {
            this.download();
        })
        let directoryInput = this.shadowRoot.getElementById('directory-input');
        let self = this;
        directoryInput.addEventListener('click', function (e) {
            self.setDir(this.dirPath);
        })
    }
    download() {
        console.log('Download clicked!');
    }
    setDir(dirPath) {
        this.directory = dirPath;
        console.log(this.directory);
    }
}

customElements.define('wgetter-form', WgetterForm);
