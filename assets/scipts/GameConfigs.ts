import { FruitType } from "./FruitType";

interface IFruitJSON {
    score: number,
    acceleration: number
}

export class GameConfigs {

    constructor(private json: JSON) {}

    getFruitScore(fruitType: FruitType): number {
        return this.json[fruitType].score;
    }

    getFruitAcceleration(fruitType: FruitType): number {
        return this.json[fruitType].acceleration;
    }
}