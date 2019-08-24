import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Array<Post> = [];
  postsUpdated: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts();
    this.postsUpdated = this.postService.getUpdatedPosts().subscribe(
      (posts: Array<Post>) => {
        this.posts = posts;
      }
    )
  }

  onDelete(id: String) {
    this.postService.deletePost(id);
  }

  ngOnDestroy() {
    this.postsUpdated.unsubscribe();
  }

}
