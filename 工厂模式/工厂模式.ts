interface IProduct {
    use(): void
}

class ProductA implements IProduct {
    use() {
        console.log("ProductA")
    }
}

class ProductB implements IProduct {
    use() {
        console.log("ProductB")
    }
}

export class SimpleFactory {
    static createProduct(type: string): IProduct {
        switch (type) {
            case "A":
                return new ProductA();
            case "B":
                return new ProductB
            default:
                throw new Error("type Error")
        }
    }
}

const p1 = SimpleFactory.createProduct("A")
const p2 = SimpleFactory.createProduct("B")
p1.use()
p2.use()