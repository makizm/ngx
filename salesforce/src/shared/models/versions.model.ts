export interface ISfVersion {
    version?: string
    label?: string
    url?: string
}

export class SfVersion implements ISfVersion {
    constructor()
    constructor(version?: string, label?: string, url?: string)
    constructor(public version?: string, public label?: string, public url?: string) {
        this.label = label || null;
        this.version = version || null;
        this.url = url || null;
    }

    fromResponse(array: any) {
        let out: SfVersion[] = [];

        array.forEach(element => {
            out.push(new SfVersion(
                element['version'],
                element['label'],
                element['url']
            ))
        })

        return out;
    }
}