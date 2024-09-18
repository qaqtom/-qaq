import { IObserver } from "./IObserver";

export class LogNotificationListener implements IObserver {
    public update(message: string): void {
        console.log(`发送Log信息：${message}`)
    }
}