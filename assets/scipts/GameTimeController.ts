import { ITimer, ITimerHandler } from "./Timer";
import type { GameTimeComponent } from "../Components/GameTimeComponent";
import { Root } from "./Root";

export class GameTimeController implements ITimerHandler {
    private model: ITimer;

    constructor(private view: GameTimeComponent) {
        this.model = Root.Instance.gameContext.timer;
        this.model.AddHandler(this);
    }

    public getRemaining(): number {
        return this.model.getRemaining();
    }

    public dispose() {
        this.model.RemoveHandler(this);
    }

    public onTimeChanged(remaining: number): void {
        this.view.setTime(remaining);
    }
}
