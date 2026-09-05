import { _decorator, Component, Label, Sprite, tween, Tween, UIOpacity, Vec2, Vec3 } from "cc";
import { FruitType } from "../scipts/FruitType";
import { FruitController } from "../scipts/FruitController";

const {ccclass, property} = _decorator;

@ccclass('FruitComponent')
export class FruitComponent extends Component {

    @property(Sprite)
    public sprite: Sprite;

    @property({type:FruitType})
    public type: FruitType = FruitType.BANANA;

    @property(Label)
    public scoreText: Label

    @property(UIOpacity)
    public scoreOpacity: UIOpacity

    private _controller: FruitController

    
    public get controller() : FruitController {
        return this._controller;
    }

    public set controller(value: FruitController) {
        this._controller = value;
        this.sprite.enabled = true;
        this.sprite.spriteFrame = this.sprite.spriteAtlas.getSpriteFrame(value.type);
        this.scoreText.string = value.score;
        this.scoreOpacity.opacity = 0;
    }

    public showScore(onEnd: () => void) {
        let newPos = new Vec3(this.node.position.x, this.node.position.y + 50)
        tween(this.node)
            .parallel(
                // tween(this.sprite).set({enabled: false}),
                tween(this.scoreText.node).set({position: this.node.position}).to(1, { position: newPos }),
                tween(this.scoreOpacity).set({opacity: 255}).to(1, { opacity: 0 })
            )
            .call(onEnd)
        .start();
    }
}