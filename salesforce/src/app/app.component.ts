import { Component } from '@angular/core';
import { GlobalState } from '../shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isNavCollapse: boolean = true;

  public currentPage: string = "home";

  constructor(private _state: GlobalState) {
    this._state.event
      .subscribe(event => {
        if(event.name == "page") this.currentPage = event.value;
      })
  }
  
}
