import { Root } from "./Root";

export class StopDialogController {
    public getScore(): number {
        return Root.Instance.gameContext.balance.get();
    }

    public restart(): void {
        Root.Instance.gameContext.balance.reset();
        Root.Instance.gameContext.garden.clear();
        Root.Instance.gameContext.timer.start();
    }
}
