import { IObserver } from "./IObserver";

export class EmailNotificationListener implements IObserver {
    public update(message: string): void {
        console.log(`发送email信息：${message}`)
    }
}