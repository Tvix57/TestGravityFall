import { _decorator, Component, Label } from "cc";
import { GameTimeController } from "../scipts/GameTimeController";

const { ccclass, property } = _decorator;
@ccclass('GameTimeComponent')
export class GameTimeComponent extends Component {
    @property(Label)
    timeText: Label = null;

    private controller: GameTimeController;

    protected onEnable(): void {
        this.controller = new GameTimeController(this);
        this.setTime(this.controller.getRemaining());
    }

    protected onDisable(): void {
        this.controller.dispose();
    }

    public setTime(value: number): void {
        this.timeText.string = Math.ceil(value).toString();
    }
}
