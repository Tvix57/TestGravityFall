import { IBalance, IBalanceHandler } from "./Balance";
import type { BalanceComponent } from "../Components/BalanceComponent";
import { Root } from "./Root";

export class BalanceController implements IBalanceHandler {
    private model: IBalance;

    constructor(private view: BalanceComponent) {
        this.model = Root.Instance.gameContext.balance;
        this.model.AddHandler(this);
    }

    public getScore(): number {
        return this.model.get();
    }

    public dispose() {
        this.model.RemoveHandler(this);
    }

    public onBalanceChanged(delta: number): void {
        this.view.setScore(this.getScore());
    }
}
