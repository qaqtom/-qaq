import { IObserver } from "./IObserver";

export class Publisher {
    private observers: IObserver[] = []

    public addObserver(observer: IObserver): void {
        this.observers.push(observer)
    }

    public removeObserver(observer: IObserver): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1)
        }
    }

    public notifyObservers(message: string) {
        this.observers.forEach(observer => observer.update(message))
    }
}