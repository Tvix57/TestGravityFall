export interface IObserver {
    observ<T>(obj: T, functionName: keyof T, callback: () => void) : void;
    observOnce<T>(obj: T, functionName: keyof T, callback: () => void) : void;
}

export class Observer implements IObserver {
    observ<T>(obj: T, functionName: keyof T, callback: () => void): void {
        type functionWithTrack<T> = (objClass: T, ...argsOrig: any[]) => any
        const originalFunction = obj[functionName] as functionWithTrack<T>
        if (typeof obj[functionName] !== 'function') {
            throw new Error(`${String(functionName)} is not a function`);
        }
        obj[functionName] = function(this: T, ...args: any[]) {   
            callback()
            return originalFunction.apply(this, args)
        } as T[keyof T]
    }

    observOnce<T>(obj: T, functionName: keyof T, callback: () => void): void {
        type functionWithTrack<T> = (objClass: T, ...argsOrig: any[]) => any
        const originalFunction = obj[functionName] as functionWithTrack<T>
        if (typeof obj[functionName] !== 'function') {
            throw new Error(`${String(functionName)} is not a function`);
        }
        obj[functionName] = function(this: T, ...args: any[]) {   
            callback()
            obj[functionName] = originalFunction as T[keyof T]
            return originalFunction.apply(this, args)
        } as T[keyof T]
    }
}
