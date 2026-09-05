import { FruitController } from "./FruitController";
import { Garden } from "./Garden";

export class GardenController {
    constructor(private model: Garden) {}

    public createRandomFruit(): FruitController {
        return new FruitController(this.model.createRandomFruit());
    }

    public catchFruit(id: number) {
        this.model.catchFruit(id);
    }

    public removeFruit(id: number) {
        this.model.removeFruit(id);
    }

    public getScore(): number {
        return this.model.getScore();
    }
}