import { Fruit } from "./Fruit";
import { FruitType } from "./FruitType";

export class FruitController {
    private _id: number;
    private _type: FruitType;
    private _score: string
    private _acceleration: number

    constructor(modell: Fruit) {
        this._id = modell.id;
        this._type = modell.type;
        this._score= modell.score.toString();
        this._acceleration = modell.acceleration;
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

    get acceleration(): number {
        return this._acceleration;
    }
}