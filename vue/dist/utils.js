import Dep from "./Dep.js";
import Watcher from "./Watcher.js";
export function observer(vm, obj) {
    const dep = new Dep();
    for (const key in obj) {
        let internalValue = obj[key];
        Object.defineProperty(vm, key, {
            get() {
                if (Dep.target) {
                    dep.addSub(Dep.target);
                }
                return internalValue;
            },
            set(newVal) {
                internalValue = newVal;
                dep.notify();
            }
        });
    }
}
export function compile(vm) {
    const el = document.querySelector(vm.$el);
    if (!el) {
        throw new Error("Element with selector can not find");
    }
    const documentFragment = document.createDocumentFragment();
    const reg = /\{\{(.*)\}\}/;
    while (el.firstChild) {
        const child = el.firstChild;
        if (child.nodeType === Node.ELEMENT_NODE) {
            const element = child;
            if (reg.test(element.innerHTML || "")) {
                const vmKey = RegExp.$1.trim();
                new Watcher(vm, child, vmKey);
            }
            else {
                Array.from(element.attributes).forEach(attr => {
                    if (attr.name === "v-model") {
                        const vmKey = attr.value;
                        element.addEventListener("input", (event) => {
                            const target = event.target;
                            vm[vmKey] = target.value;
                        });
                    }
                });
            }
        }
        else if (child.nodeType === Node.TEXT_NODE && reg.test(child.nodeValue || '')) {
            const vmKey = RegExp.$1.trim();
            new Watcher(vm, child, vmKey);
        }
        documentFragment.appendChild(child);
    }
    el.appendChild(documentFragment);
}
