const remote = require('electron').remote;
// const {runS16WGetter, runPy} = require('../tools/runPy');
const Store = require('../tools/store');
const s16wgetter = require('../scripts/s16wgetter');
const wgetterFormOwner = document.currentScript.ownerDocument;

class WgetterForm extends HTMLElement {
    constructor() {
        super();
        this.store = new Store({
            configName: 'userDefaults',
            defaults: {
                masterIdxDir: '',
                outDir: '',
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
        let midxDirInput = this.shadowRoot.getElementById('midx-dir-input');
        let defaultMidxDir = this.store.get('masterIdxDir');
        if (defaultMidxDir) {
            midxDirInput.setAttribute('dir', defaultMidxDir);
            this.setMidxDir(defaultMidxDir);
        }
        midxDirInput.addEventListener('set', e => {
            this.setMidxDir(e.detail.dirPath);
        })

        let outDirInput = this.shadowRoot.getElementById('out-dir-input');
        let defaultOutDir = this.store.get('outDir');
        if (defaultOutDir) {
            outDirInput.setAttribute('dir', defaultOutDir);
            this.setOutDir(defaultOutDir);
        }
        outDirInput.addEventListener('set', e => {
            this.setOutDir(e.detail.dirPath);
        })

        let listBuilder = this.shadowRoot.getElementById('list-builder');
        let defaultList = this.store.get('cikList');
        if (defaultList && defaultList.length > 0) {
            listBuilder.setAttribute('list', JSON.stringify(defaultList));
            this.setCikList(defaultList);
        }
        listBuilder.addEventListener('update', e => {
            this.setCikList(e.detail.list);
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
            masterIdxDir: this.masterIdxDir,
            outDir: this.outDir,
            cikList: this.cikList,
            saveDefaults: this.saveDefaults
        };
        if (this.saveDefaults) {
            let keys = Object.keys(data);
            for (let i = 0; i < keys.length; ++i) {
                let key = keys[i];
                if (!data.hasOwnProperty(key)) continue;
                this.store.set(key, data[key]);
            }
        }
        let dlOut = this.shadowRoot.getElementById('dl-out');
        let dlProgOut = this.shadowRoot.getElementById('dl-progress-out');
        dlProgOut.innerHTML = 'Working...';
        dlOut.innerHTML = '';
        s16wgetter(data.outDir, data.masterIdxDir, data.cikList, this.handleDLprogress.bind(this))
            .then(() => {
                dlProgOut.innerHTML = '';
                dlOut.innerHTML = '';
                let success = document.createElement('i');
                success.className = 'icon icon-checkmark-sign-outline text-success l-margin-right-lg'
                dlOut.appendChild(success)
                dlOut.appendChild(document.createTextNode('Complete'))
                let openDirButton = document.createElement('button');
                openDirButton.className = 'btn btn-link';
                openDirButton.addEventListener('click', e => {
                    remote.shell.openItem(this.outDir);
                })
                openDirButton.innerText = 'Open Output Directory';
                dlOut.appendChild(openDirButton);
            })
            .catch((err) => {
                dlProgOut.innerHTML = err;
            });
    }
    setOutDir(dirPath) {
        this.outDir = dirPath;
    }
    setMidxDir(dirPath) {
        this.masterIdxDir = dirPath;
    }
    setCikList(cikList) {
        this.cikList = cikList;
    }
    /**
     * 
     * @param {string} midxFileName current master.idx file name
     * @param {number} downloaded amount of current file downloaded
     * @param {number} outOf
     */
    handleDLprogress(midxFileName, downloaded, outOf) {
        let dlProgOut = this.shadowRoot.getElementById('dl-progress-out');
        let percent = Math.floor(downloaded/outOf);
        dlProgOut.innerHTML = `${midxFileName}: ${percent}%`;
    }
}

customElements.define('wgetter-form', WgetterForm);
