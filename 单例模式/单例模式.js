class Person {
    constructor(age, name) {
        this.age = age
        this.name = name
    }
}

function getInstance(fn) {
    let instance = null
    return function (...args) {
        if (instance) {
            return instance
        } else {
            instance = new fn(...args)
            return instance
        }
    }
}

const SinglePerson = getInstance(Person)

const p1 = new SinglePerson(26, "ym")
const p2 = new SinglePerson(21, "zm")

console.log(p1 === p2) //true