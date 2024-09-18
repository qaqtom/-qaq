import Vue from "./Vue.js";
import Dep from "./Dep.js";
import Watcher from "./Watcher.js";

export function observer(vm: Vue, obj: Record<string, any>) {
    const dep = new Dep();

    for (const key in obj) {
        let internalValue = obj[key]
        Object.defineProperty(vm, key, {
            get(): any {
                if (Dep.target) {
                    dep.addSub(Dep.target);
                }
                return internalValue;
            },
            set(newVal: any): void {
                internalValue = newVal;
                dep.notify();
            }
        })
    }
}

export function compile(vm: Vue): void {
    const el: HTMLElement | null = document.querySelector(vm.$el);
    if (!el) {
        throw new Error("Element with selector can not find")
    }

    const documentFragment: DocumentFragment = document.createDocumentFragment()

    const reg: RegExp = /\{\{(.*)\}\}/;
    while (el.firstChild) {
        const child: ChildNode = el.firstChild
        if (child.nodeType === Node.ELEMENT_NODE) {
            //元素节点
            const element = child as HTMLElement
            if (reg.test(element.innerHTML || "")) {
                const vmKey: string = RegExp.$1.trim();
                new Watcher(vm, child, vmKey)
            } else {
                Array.from(element.attributes).forEach(attr => {
                    if (attr.name === "v-model") {
                        const vmKey: string = attr.value;
                        element.addEventListener("input", (event: Event) => {
                            const target = event.target as HTMLInputElement
                            vm[vmKey] = target.value
                        })
                    }
                })

            }

        } else if (child.nodeType === Node.TEXT_NODE && reg.test(child.nodeValue || '')) {
            //文本节点，并且有{{}}
            const vmKey: string = RegExp.$1.trim();
            new Watcher(vm, child, vmKey)
        }

        //这里的appendChild，实际上做的是一个移动操作
        documentFragment.appendChild(child)
    }

    el.appendChild(documentFragment)
}