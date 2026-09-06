import type { GardenComponent } from "../Components/GardenComponent";
import { FruitController } from "./FruitController";
import { Garden } from "./Garden";
import { Root } from "./Root";
import { ITimer, ITimerHandler } from "./Timer";

export class GardenController implements ITimerHandler {
    private model: Garden;
    private timer: ITimer;
    private roundActive: boolean = false;

    constructor(private view: GardenComponent) {
        this.model = Root.Instance.gameContext.garden;
        this.timer = Root.Instance.gameContext.timer;
        this.timer.AddHandler(this);
    }

    public createRandomFruit(): FruitController {
        return new FruitController(this.model.createRandomFruit());
    }

    public catchFruit(id: number) {
        this.model.catchFruit(id);
    }

    public removeFruit(id: number) {
        this.model.removeFruit(id);
    }

    public pauseTimer(): void {
        this.timer.pause();
    }

    public resumeTimer(): void {
        this.timer.resume();
    }

    public dispose(): void {
        this.timer.RemoveHandler(this);
    }

    public onTimeChanged(remaining: number): void {
        if (remaining > 0) {
            if (!this.roundActive) {
                this.roundActive = true;
                this.view.beginRound();
            }
            this.view.spawnFruit();
        } else if (this.roundActive) {
            this.roundActive = false;
            this.view.endRound();
        }
    }
}
