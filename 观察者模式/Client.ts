import { Publisher } from "./Publisher";
import { EmailNotificationListener } from "./Email";
import { LogNotificationListener } from "./Log";

//创建发布中心
const newPublisher = new Publisher()

//创建观察者
const logObserver = new LogNotificationListener()
const emailObserver = new EmailNotificationListener()

newPublisher.addObserver(logObserver)
newPublisher.addObserver(emailObserver)

newPublisher.notifyObservers("你好")