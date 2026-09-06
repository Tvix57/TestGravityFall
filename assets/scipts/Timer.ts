import { AbstractDispatcher, IDispatcher } from "./misc/Dispatcher";

const ROUND_DURATION = 60;
const TICK_INTERVAL_MS = 1000;

export interface ITimerHandler {
    onTimeChanged(remaining: number): void;
}

export interface ITimer extends IDispatcher<ITimerHandler> {
    start(): void;
    pause(): void;
    resume(): void;
    getRemaining(): number;
}

export class Timer extends AbstractDispatcher<ITimerHandler> implements ITimer {
    private _remaining: number = 0;
    private _running: boolean = false;
    private _intervalId: ReturnType<typeof setInterval> = null;

    public start() {
        this._remaining = ROUND_DURATION;
        this._running = true;
        this._dispatcher.Post((arg): void => { arg.onTimeChanged(this._remaining); });
        this.startInterval();
    }

    public pause(): void {
        this._running = false;
        this.stopInterval();
    }

    public resume(): void {
        this._running = true;
        this.startInterval();
    }

    public getRemaining(): number {
        return this._remaining;
    }

    private tick(): void {
        if (!this._running) return;

        this._remaining = Math.max(0, this._remaining - TICK_INTERVAL_MS / 1000);
        if (this._remaining <= 0) {
            this._running = false;
            this.stopInterval();
        }
        this._dispatcher.Post((arg): void => { arg.onTimeChanged(this._remaining); });
    }

    private startInterval(): void {
        this.stopInterval();
        this._intervalId = setInterval(() => this.tick(), TICK_INTERVAL_MS);
    }

    private stopInterval(): void {
        if (this._intervalId !== null) {
            clearInterval(this._intervalId);
            this._intervalId = null;
        }
    }
}
