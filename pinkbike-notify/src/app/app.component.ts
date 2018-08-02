import { Component, OnInit } from '@angular/core';

import { ElectronService } from 'ngx-electron';

import { Post } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ElectronService ]
})
export class AppComponent implements OnInit {
  posts: Array<Post> = [];

  constructor(private _es: ElectronService) {
    this.posts.push(new Post("1", "#", "2018 Trek Remedy 8 Large 19.5\"", "Bike is in excellent condition and has been well maintained. It has less than 200 miles on it. There is a slight ding...", "https://ep1.pinkbike.org/p1pb15729556/p1pb15729556.jpg"));
    this.posts.push(new Post("2", "#", "Post two", "Some info", "https://ep1.pinkbike.org/p1pb15961123/p1pb15961123.jpg"));
    this.posts.push(new Post("3", "#", "Post three", "Some info", "https://ep1.pinkbike.org/p1pb15681934/p1pb15681934.jpg"));
    this.posts.push(new Post("4", "#", "Post four", "Some info", "https://ep1.pinkbike.org/p1pb15940369/p1pb15940369.jpg"));
    this.posts.push(new Post("5", "#", "Post five", "Some info", "https://ep1.pinkbike.org/p1pb15552210/p1pb15552210.jpg"));
    this.posts.push(new Post("6", "#", "Post six", "Some info", "https://ep1.pinkbike.org/p1pb12817658/p1pb12817658.jpg"));
  }

  ngOnInit() {
    if(this._es.isElectronApp) {
      let pong: string = this._es.ipcRenderer.sendSync('synchronous-message', 'ping');

      console.log(pong);

      this._es.ipcRenderer.on('asynchronous-reply', (event, arg) => {
        console.log(arg) // prints "pong"
      })
      
      this._es.ipcRenderer.send('asynchronous-message', 'ping')
    }
  }

}
