import { Fruit } from "./Fruit";
import { FruitType } from "./FruitType";

export class FruitController {
    private _id: number;
    private _type: FruitType;
    private _score: string

    constructor(modell: Fruit) {
        this._id = modell.id;
        this._type = modell.type;
        this._score= modell.score.toString();
    }

    get id(): number {
        return this._id;
    }

    get type(): FruitType {
        return this._type;
    }

    get score(): string {
        return this._score;
    }
}