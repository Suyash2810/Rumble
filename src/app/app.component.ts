import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  posts: Array<{ title: String, content: String }> = [];

  onAddPosts(post) {
    this.posts.push(post);
  }
}
