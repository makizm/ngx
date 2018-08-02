import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

const ORIGIN = window.location.origin;
const SOCKETIOADDRESS = ORIGIN;
const APIURL = ORIGIN + '/api/sensor';

@Injectable()
export class EarthSensorService {

    private _sensors: any;

    private _socket;

    constructor() {
        this._socket = io(SOCKETIOADDRESS);
    }

    public getValue() {
        let i = 0;

        let sensor: Subject<number> = new Subject();

        setInterval(()=> {
            ++i;
            if(i===100) i = 0;

            this._sensors.one = i;

            sensor.next(i);
        }, 60000)

        return sensor.asObservable();
    }

    connect() {
        let sensors: Subject<{}> = new Subject();

        this._socket.on('sensors', (data) => {
            sensors.next(data);
        });

        return sensors;
    }

    disconnect() {
        this._socket.disconnect();
    }

}
