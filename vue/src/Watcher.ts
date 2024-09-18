import Vue from './Vue.js'
import Dep from './Dep.js'


//观察者
export default class Watcher {
    vm: Vue;
    el: Node;
    vmKey: string;

    constructor(vm: Vue, el: Node, vmKey: string) {
        this.vm = vm;
        this.el = el;
        this.vmKey = vmKey;
        Dep.target = this;
        this.update();
        Dep.target = null;
    }

    update(): void {
        if (this.el.nodeType === Node.TEXT_NODE) {
            this.el.nodeValue = this.vm[this.vmKey]
        } else if (this.el.nodeType === Node.ELEMENT_NODE) {
            (this.el as HTMLElement).innerHTML = this.vm[this.vmKey]
        }
    }
}