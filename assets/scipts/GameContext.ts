import { Balance } from "./Balance";
import { Garden } from "./Garden";

export class GameContext {
    private _balance: Balance = new Balance()
    private _gargen: Garden = new Garden()

    public get balance(): Balance {
        return this._balance;
    }    
    public get garden(): Garden {
        return this._gargen;
    }
}