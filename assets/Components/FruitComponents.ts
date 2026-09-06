import { _decorator, Component, Sprite } from "cc";
import { FruitType } from "../scipts/FruitType";
import { FruitController } from "../scipts/FruitController";

const {ccclass, property} = _decorator;

@ccclass('FruitComponent')
export class FruitComponent extends Component {

    @property(Sprite)
    public sprite: Sprite;

    @property({type:FruitType})
    public type: FruitType = FruitType.BANANA;

    private _controller: FruitController


    public get controller() : FruitController {
        return this._controller;
    }

    public set controller(value: FruitController) {
        this._controller = value;
        this.sprite.enabled = true;
        this.sprite.spriteFrame = this.sprite.spriteAtlas.getSpriteFrame(value.type);
    }
}
