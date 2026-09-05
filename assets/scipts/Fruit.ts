import { FruitType } from "./FruitType";
import { Root } from "./Root";

export class Fruit {
    public id: number;
    public type: FruitType;
    public score: number;

    constructor() {
        this.id = Date.now();

        const keys = Object.keys(FruitType);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        this.type = FruitType[randomKey];
        this.score = Root.Instance.config.getFruitScore(this.type);
    }
} 