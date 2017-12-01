const remote = require('electron').remote;
const Store = require('../tools/store');
const wgetterFormOwner = document.currentScript.ownerDocument;

class WgetterForm extends HTMLElement {
    constructor() {
        super();
        this.store = new Store({
            configName: 'userDefaults',
            defaults: {
                directory: '',
                cikList: [],
                saveDefaults: false,
            }
        });
        // initialize any event listeners
    }
    connectedCallback() {
        const shadowRoot = this.attachShadow({mode: 'open'});
        const template = wgetterFormOwner.getElementById('wgetter-form-template');
        const instance = template.content.cloneNode(true);
        shadowRoot.appendChild(instance);
        this.cikList = [];
        this.render();
    }
    render() {
        // any initial js -> dom manipulation needed 
        // accessing elements via this.shadowroot instead of document
        let directoryInput = this.shadowRoot.getElementById('directory-input');
        let defaultDir = this.store.get('directory');
        if (defaultDir) {
            directoryInput.setAttribute('dir', defaultDir);
            this.setDir(defaultDir);
        }
        directoryInput.addEventListener('set', e => {
            this.setDir(e.detail.dirPath);
        })
        let defaultList = this.store.get('cikList');
        if (defaultList && defaultList.length > 0) {
            directoryInput.dispatchEvent(new CustomEvent('update', {detail: {list: defaultList}}));
        }
        let listBuilder = this.shadowRoot.getElementById('list-builder');
        directoryInput.addEventListener('update', e => {
            this.cikList = e.detail.list;
        });
        let downloadBtn = this.shadowRoot.getElementById('download-button');
        downloadBtn.addEventListener('click', e => {
            this.download();
        })
        let saveDefaults = this.shadowRoot.getElementById('save');
        let defaultSaved = this.store.get('saveDefaults');
        if (defaultSaved) {
            saveDefaults.setAttribute('checked',true);
            this.saveDefaults = true;
        }
        saveDefaults.addEventListener('change', e => {
            this.saveDefaults = e.target.checked;
        })
    }
    download() {
        let data = {
            directory: this.directory,
            cikList: this.cikList,
            saveDefaults: this.saveDefaults,
        };
        if (this.saveDefaults) {
            let keys = Object.keys(data);
            for (let i = 0; i < keys.length; ++i) {
                let key = keys[i];
                if (!data.hasOwnProperty(key)) continue;
                this.store.set(key, data[key]);
            }
        }
    }
    setDir(dirPath) {
        this.directory = dirPath;
    }
}

customElements.define('wgetter-form', WgetterForm);
