import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as io from 'socket.io-client';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { WaterValve } from '../../models'

const SRV_ORIGIN = location.origin;

@Injectable()
export class WaterValveService {
    public valve: WaterValve;

    /**
     * Valve id
     */
    public id: number;

    // { id: 1, value: "on/off" }
    private _state: Subject<any>;

    protected _headers: HttpHeaders

    constructor(private http: HttpClient) {
        if(!this.valve) this.valve = new WaterValve()

        this._headers = new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'secret'
        })
    }

    get() {
        let url = "/api/valve/" + this.id;

        console.log("Get");

        return this.http.get(url, { headers: this._headers });
    }

    open(minutes?: number) {
        let runTime = minutes || 1;

        let url = "/api/valve/" + this.id;

        console.log("Open");

        return this.http.post(url, { value: "on" }, { headers: this._headers }).pipe(map(res => res))
    }

    close() {
        let url = "/api/valve/" + this.id;

        console.log("Close");

        return this.http.post(url, { value: "off" }, { headers: this._headers });
    }

    /**
     * On valve state changes
     * @param callback Calback function 
     */
    on(callback: Function) {
        let socket = io.connect(SRV_ORIGIN);

        socket.on('valvestate', (data) => {
            let state = data['value']

            callback(state);
        });
    }
}
