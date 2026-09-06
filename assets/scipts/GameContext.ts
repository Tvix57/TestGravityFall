import { Balance } from "./Balance";
import { Garden } from "./Garden";
import { Timer } from "./Timer";

export class GameContext {
    private _balance: Balance = new Balance()
    private _gargen: Garden = new Garden(this._balance)
    private _timer: Timer = new Timer()

    public get balance(): Balance {
        return this._balance;
    }
    public get garden(): Garden {
        return this._gargen;
    }
    public get timer(): Timer {
        return this._timer;
    }
}