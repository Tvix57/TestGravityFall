export interface IDispatcher<T>
{
    AddHandler(arg: T): void ;
    RemoveHandler(arg: T): void ;
    RemoveAll(): void ;
}

export abstract class AbstractDispatcher<T>
{
    protected _dispatcher: Dispatcher<T> = new Dispatcher

    AddHandler(arg: T): void {
        this._dispatcher.AddObserver(arg);
    }
    RemoveHandler(arg: T): void {
        this._dispatcher.RemoveObserver(arg)
    }
    RemoveAll(): void {
        this._dispatcher.RemoveAll()
    }
}

export class Dispatcher<T>{
    private _observers : Array<T>

    constructor(){
        this._observers = new Array<T>
    }

    Post(fn:(arg:T)=>void){
        this._observers.forEach(element => { fn(element) });
    }

    AddObserver(arg:T) {
        if(this._observers.indexOf(arg) != -1 ) return
        this._observers.push(arg);
    }
    
    RemoveObserver(arg:T){
        let index = this._observers.indexOf(arg)
        if(index != -1){
            this._observers.splice(index,1)
        }
    }

    RemoveAll(){
        this._observers.length = 0
    }
}