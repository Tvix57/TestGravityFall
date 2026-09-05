export class Balance {
    private _val: number = 0;

    consntructor(save: number = 0) {
        this._val = save;
    }
    public get(): number {
        return this._val;
    }

    public add(val: number) {
        this._val += val;
    }

    public reset() {
        this._val = 0;
    }
}