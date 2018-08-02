import { IWaterValve } from './valve.interface';

export class WaterValve implements IWaterValve {
	constructor()
	constructor(text:string, btnText:string, isOpened:boolean, loading:boolean)
	constructor(public text?:string, public btnText?:string, public isOpened?:boolean, public loading?:boolean) {
		this.text = text || "Closed";
		this.btnText = btnText || "Open";
		this.isOpened = isOpened || false;
		this.loading = loading || false;
	}

	public open() {
		this.text = "Opened";
		this.btnText = "Close";
		this.isOpened = true;
	}

	public close() {
		this.text = "Closed";
		this.btnText = "Open";
		this.isOpened = false;
	}

	public toggle() {
		if(this.isOpened) {
			this.close();
		} else {
			this.open();
		}
	}
}
