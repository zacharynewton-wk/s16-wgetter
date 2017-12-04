const listBuilderOwner = document.currentScript.ownerDocument;

class ListBuilder extends HTMLElement {
    constructor() {
        super();
        // initialize any event listeners
    }
    static get observedAttributes() {return ['list']}
    connectedCallback() {
        const shadowRoot = this.attachShadow({mode: 'open'});
        const template = listBuilderOwner.getElementById('list-builder-template');
        const instance = template.content.cloneNode(true);
        this.cikList = [];
        this.currentInput = '';
        if (this.getAttribute('list')) {
            this.cikList = JSON.parse(this.getAttribute('list'));
        }
        shadowRoot.appendChild(instance);
        this.render();
    }
    render() {
        // any initial js -> dom manipulation needed 
        // accessing elements via this.shadowroot instead of document
        let cikInput = this.shadowRoot.getElementById('cik-input');
        cikInput.addEventListener('keypress', e => {
            // enter, tab
            if (e.keyCode == 13) {
                this.addCik()
            }
        })
        let cikAddBtn = this.shadowRoot.getElementById('cik-add-btn');
        cikAddBtn.addEventListener('click', e => {
            this.addCik();
        })
        this.rebuildList();
    }
    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
        if (attributeName == 'list') {
            this.cikList = JSON.parse(newValue);
            this.rebuildList();
        }
    }
    newCikElement(cik, index) {
        let newCikElement = document.createElement('li');
        let cikSpan = document.createElement('span');
        cikSpan.innerText = cik;
        newCikElement.appendChild(cikSpan);
        let removeCikBtn = document.createElement('button');
        removeCikBtn.className = 'btn';
        removeCikBtn.innerHTML = '<i class="icon icon-minus"></i>';
        removeCikBtn.addEventListener('click', e => {
            this.removeCik(index);
        })
        newCikElement.appendChild(removeCikBtn);
        return newCikElement;
    }
    addCik() {
        let cikInput = this.shadowRoot.getElementById('cik-input');
        let newCik = cikInput.value;
        if (!newCik) return;
        this.cikList.push(newCik);
        let cikList = this.shadowRoot.getElementById('cik-list');
        cikList.insertBefore(this.newCikElement(newCik, this.cikList.length - 1), cikList.firstChild);
        cikInput.value = '';
        this.dispatchEvent(new CustomEvent('update', {detail: {list: this.cikList}}));
    }
    removeCik(index) {
        this.cikList.splice(index, 1);
        this.dispatchEvent(new CustomEvent('update', {detail: {list: this.cikList}}));
        this.rebuildList();
    }
    rebuildList() {
        if (!this.shadowRoot) return;
        let cikList = this.shadowRoot.getElementById('cik-list');
        cikList.innerHTML = '';
        for (let i = 0; i < this.cikList.length; ++i) {
            cikList.insertBefore(this.newCikElement(this.cikList[i], i), cikList.firstChild);
        }
    }
}

customElements.define('list-builder', ListBuilder);
