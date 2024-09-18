import Dep from './Dep.js';
export default class Watcher {
    constructor(vm, el, vmKey) {
        this.vm = vm;
        this.el = el;
        this.vmKey = vmKey;
        Dep.target = this;
        this.update();
        Dep.target = null;
    }
    update() {
        if (this.el.nodeType === Node.TEXT_NODE) {
            this.el.nodeValue = this.vm[this.vmKey];
        }
        else if (this.el.nodeType === Node.ELEMENT_NODE) {
            this.el.innerHTML = this.vm[this.vmKey];
        }
    }
}
