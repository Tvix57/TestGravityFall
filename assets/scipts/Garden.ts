import { Fruit } from "./Fruit";
import { Root } from "./Root";

export class Garden {
    private fallFruits: Map<number, Fruit> = new Map<number, Fruit>();

    public createRandomFruit() {
        let fruit = new Fruit();
        this.fallFruits.set(fruit.id, fruit);
        return fruit;
    }


    public catchFruit(id: number) {
        Root.Instance.gameContext.balance.add(this.fallFruits.get(id)?.score??0);
        this.removeFruit(id)
    }


    public removeFruit(id: number) {
        this.fallFruits.delete(id);
    }

    public getScore(): number {
        return Root.Instance.gameContext.balance.get();
    }
}