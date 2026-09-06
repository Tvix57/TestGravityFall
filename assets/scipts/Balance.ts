import { AbstractDispatcher, IDispatcher } from "./misc/Dispatcher";

export interface IBalanceHandler {
    onBalanceChanged(delta: number): void;
}

export interface IBalance extends IDispatcher<IBalanceHandler> {
    add(val: number): void;
    reset(): void;
    get(): number;
}

export class Balance extends AbstractDispatcher<IBalanceHandler> implements IBalance {
    private _val: number = 0;

    constructor(save: number = 0) {
        super();
        this._val = save;
    }

    public get(): number {
        return this._val;
    }

    public add(val: number) {
        this._val += val;
        this._dispatcher.Post((arg): void => { arg.onBalanceChanged(val); });
    }

    public reset() {
        const delta = -this._val;
        this._val = 0;
        this._dispatcher.Post((arg): void => { arg.onBalanceChanged(delta); });
    }
}
