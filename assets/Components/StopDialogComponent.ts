import { _decorator, Component, Label, Button, game } from "cc";
import { StopDialogController } from "../scipts/StopDialogController";

const { ccclass, property } = _decorator;
@ccclass('StopDialogComponent')
export class StopDialogComponent extends Component {
    @property(Label)
    scoreText: Label = null;

    @property(Button)
    restartButton: Button = null;

    @property(Label)
    restartButtonLabel: Label = null;

    @property(Button)
    exitButton: Button = null;

    private controller: StopDialogController;

    protected onLoad(): void {
        this.controller = new StopDialogController();
        this.restartButton.node.on(Button.EventType.CLICK, this.onRestartClick, this);
        this.exitButton.node.on(Button.EventType.CLICK, this.onExitClick, this);
    }

    protected onDestroy(): void {
        this.restartButton.node.off(Button.EventType.CLICK, this.onRestartClick, this);
        this.exitButton.node.off(Button.EventType.CLICK, this.onExitClick, this);
    }

    public showStart(): void {
        this.restartButtonLabel.string = "Start";
        this.node.active = true;
    }

    public showRestart(): void {
        this.restartButtonLabel.string = "Restart";
        this.scoreText.string = this.controller.getScore().toString();
        this.node.active = true;
    }

    public hide(): void {
        this.node.active = false;
    }

    private onRestartClick(): void {
        this.controller.restart();
        this.hide();
    }

    private onExitClick(): void {
        game.end();
    }
}
