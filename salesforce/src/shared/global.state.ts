import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class GlobalState {
    private _event: Subject<{ name: string, value: string }>;

    constructor() {
        if(!this._event) this._event = new Subject();
    }

    /**
     * Global state event sharing
     */
    public get event() {
        return this._event.asObservable()
    }

    /**
     * Notify subscribers with new custom event
     * @param event Custom event Object
     */
    notify(event: { name: string, value: string }) {
        this._event.next(event);
    }
}
