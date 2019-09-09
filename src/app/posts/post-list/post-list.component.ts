import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../posts.service';
import { PageEvent } from "@angular/material";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Array<Post> = [];
  postsUpdated: Subscription;
  isLoading: Boolean = false;
  totalPosts: number = 10;
  postPerPage: number = 2;
  postSize: Array<number> = [1, 2, 5, 10];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.postsUpdated = this.postService.getUpdatedPosts().subscribe(
      (posts: Array<Post>) => {
        this.posts = posts;
        this.isLoading = false;
      }
    )
  }

  onDelete(id: String) {
    this.postService.deletePost(id);
  }

  pageUpdateFunc(page: PageEvent) {
    console.log(page);
  }

  ngOnDestroy() {
    this.postsUpdated.unsubscribe();
  }

}
