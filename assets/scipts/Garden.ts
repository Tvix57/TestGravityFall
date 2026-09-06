import { Fruit } from "./Fruit";
import { IBalance } from "./Balance";

export class Garden {
    private fallFruits: Map<number, Fruit> = new Map<number, Fruit>();

    constructor(private balance: IBalance) {}

    public createRandomFruit() {
        let fruit = new Fruit();
        this.fallFruits.set(fruit.id, fruit);
        return fruit;
    }


    public catchFruit(id: number) {
        this.balance.add(this.fallFruits.get(id)?.score??0);
        this.removeFruit(id)
    }

    public removeFruit(id: number) {
        this.fallFruits.delete(id);
    }

    public clear() {
        this.fallFruits.clear();
    }
}