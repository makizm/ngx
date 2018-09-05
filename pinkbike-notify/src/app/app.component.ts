import { Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit } from '@angular/core';

import { ElectronService } from 'ngx-electron';

import { Post } from './shared';

import { PbArticle } from '../../pinkbike/article';

import * as Immutable from 'immutable';
import { ValueTransformer } from '../../node_modules/@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ElectronService ],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  posts: Array<PbArticle> = [];

  postList = Immutable.List<PbArticle>();

  constructor(private _es: ElectronService, private _cd: ChangeDetectorRef) {
    // this.posts.push(new Post("1", "#", "2018 Trek Remedy 8 Large 19.5\"", "Bike is in excellent condition and has been well maintained. It has less than 200 miles on it. There is a slight ding...", "https://ep1.pinkbike.org/p1pb15729556/p1pb15729556.jpg"));
    // this.posts.push(new Post("2", "#", "Post two", "Some info", "https://ep1.pinkbike.org/p1pb15961123/p1pb15961123.jpg"));
    // this.posts.push(new Post("3", "#", "Post three", "Some info", "https://ep1.pinkbike.org/p1pb15681934/p1pb15681934.jpg"));
    // this.posts.push(new Post("4", "#", "Post four", "Some info", "https://ep1.pinkbike.org/p1pb15940369/p1pb15940369.jpg"));
    // this.posts.push(new Post("5", "#", "Post five", "Some info", "https://ep1.pinkbike.org/p1pb15552210/p1pb15552210.jpg"));
    // this.posts.push(new Post("6", "#", "Post six", "Some info", "https://ep1.pinkbike.org/p1pb12817658/p1pb12817658.jpg"));
  }

  addPost(post: PbArticle) {

    this.postList = this.postList.insert(0, post)

  }

  openUrl(article: PbArticle) {
    this._es.shell.openExternal(article.url, null, (err) => {
      if(err) console.log("Unable to open url " + article.url)
    })
  }

  ngOnInit() {

    setInterval(() => {
      if(this.postList.has) {
        this.postList.forEach((value, key, iter) => {
          console.log(value)
        })
      }
    }, 2000)

    if(this._es.isElectronApp) {
      let pong: string = this._es.ipcRenderer.sendSync('synchronous-message', 'ping');

      console.log(pong);

      this._es.ipcRenderer.on('new-posts', (event, article) => {

        let newArticle = new PbArticle();
          newArticle.id = article['id'];
          newArticle.title = article['title'];
          newArticle.category = article['category'];
          newArticle.imageUrl = article['imageUrl'];
          newArticle.postId = article['postId'];
          newArticle.url = article['url'];
          newArticle.description = article['description'];

        this.addPost(newArticle)

      })
      
      this._es.ipcRenderer.send('asynchronous-message', 'ping')
    }
  }

}
