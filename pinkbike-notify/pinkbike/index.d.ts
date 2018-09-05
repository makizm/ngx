import { Observable, Subject } from '../node_modules/rxjs';
import { PbArticle } from './article';

export declare class PinkBike {
    private _post: Subject<any>;

    private _process: any;

    private _interval: number;

    private _articles: Array<any>;

    private _host: string;
    private _path: string;

    readonly post: Observable<PbArticle>;

    public interval: number;

    constructor(host?: string, path?: string)

    start(): void;

    stop(): void;
}

// export declare function of<T>(a: T, scheduler?: SchedulerLike): Observable<T>;

// /**
//  * @class PbPost<T>
//  */
// export declare class PbPost {
//     id: string;
//     title: string;
//     category: string;
//     imageUrl: string;
//     url: string;
//     postId: string
// }
