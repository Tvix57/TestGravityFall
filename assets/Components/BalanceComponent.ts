import { _decorator, Component, Label } from "cc";
import { BalanceController } from "../scipts/BalanceController";

const { ccclass, property } = _decorator;
@ccclass('BalanceComponent')
export class BalanceComponent extends Component {
    @property(Label)
    scoreText: Label = null;

    private controller: BalanceController;

    protected onEnable(): void {
        this.controller = new BalanceController(this);
        this.setScore(this.controller.getScore());
    }

    protected onDisable(): void {
        this.controller.dispose();
    }

    public setScore(value: number): void {
        this.scoreText.string = value.toString();
    }
}
