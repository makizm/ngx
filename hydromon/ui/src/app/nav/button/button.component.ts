import { Component, OnInit, Input, HostListener } from '@angular/core';

import { WaterValve } from '../../models';

import { WaterValveService } from '../../services';

@Component({
	selector: 'nav-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss']
})

export class ButtonComponent implements OnInit {

	@Input() valve: WaterValve;

	public error: string;

	@HostListener('document:click', ['$event'])
	clickout(event) {
		// close prompt when clicked outside of the button
		if(this.showPrompt == true && event.target.id != "toggler") {
			this.showPrompt = false;
		}
	}

	public showPrompt = false;

	constructor(private _valve: WaterValveService) {
		// set water valve gpio pin
		this._valve.id = 1;
	}

	ngOnInit() {
		this._valve.on((state) => {
			console.log("Valve is now " + state);

			if(state == "on") this.valve.open();

			if(state == "off") this.valve.close();

			// reset loading
			this.valve.loading = false;
		})
	}

	public ButtonToggle() {
		// show prompt before triggering valve open
		if(!this.valve.isOpened && !this.showPrompt) {
			this.showPrompt = true;
			this.valve.btnText = "GO!"
		// assume valve is opened so close it
		} else {
			// this.valve.close();

			this.Close();
		}
	}

	public Open(minutes:number) {
		// this.valve.open();
		this.valve.loading = true;
		
		this.showPrompt = false;
		console.log("Opening valve for " + minutes + " minutes");

		this._valve.open()
			.subscribe(
				data => { console.log(data) },
				err => this._showError(err)	// HttpErrorResponse
			)
	}

	public Close() {
		this.valve.loading = true;

		this._valve.close()
			.subscribe(
				data => console.log(data),
				err => this._showError(err)	// HttpErrorResponse
			)
	}

	private _showError(err) {
		console.log(err)
		let id = (err['status']) ? err['status'] + " - " : null;
		let msg = err['statusText'] || 'Unknown error';

		this.error = id + msg;
	}
}