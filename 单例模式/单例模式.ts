class tsPerson {
    private name: string;
    private age: number;
    public static instance: tsPerson;

    private constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }

    public static getInstance(name: string, age: number) {
        if (tsPerson.instance) {
            return tsPerson.instance
        } else {
            tsPerson.instance = new tsPerson(name, age)
            return tsPerson.instance
        }
    }
}

const o1 = tsPerson.getInstance("ym", 21)
const o2 = tsPerson.getInstance("zm", 21)
console.log(o1 === o2)