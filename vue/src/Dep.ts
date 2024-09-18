import Watcher from "./Watcher.js"
//发布者
export default class Dep {
    static target: Watcher | null = null;//暂时保存当前的Watcher
    subs: Watcher[];//存储所有的观察者

    constructor() {
        this.subs = []
    }

    addSub(sub: Watcher): void {
        this.subs.push(sub)
    }

    //通知方法
    notify(): void {
        this.subs.forEach(sub => sub.update());
    }
}