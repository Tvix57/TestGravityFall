import { FruitType } from "./FruitType";


export class GameConfigs {

    constructor(private json: JSON) {}

    getFruitScore(fruitType: FruitType): number {
        return this.json[fruitType];
    }
}