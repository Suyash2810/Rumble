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
  isLoading: boolean = false;
  totalPosts: number = 10;
  postPerPage: number = 2;
  currentIndex: number = 1;
  postSize: Array<number> = [1, 2, 5, 10];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.isLoading = true;
    console.log(this.postPerPage + " " + this.currentIndex);
    this.postService.getPosts(this.postPerPage, this.currentIndex);
    this.postsUpdated = this.postService.getUpdatedPosts().subscribe(
      (data: { posts: Array<Post>, postsCount: number }) => {
        this.posts = data.posts;
        this.totalPosts = data.postsCount;
        this.isLoading = false;
      }
    )
  }

  onDelete(id: String) {
    this.postService.deletePost(id).subscribe(
      () => {
        this.postService.getPosts(this.postPerPage, this.currentIndex);
      }
    );
  }

  pageUpdateFunc(page: PageEvent) {
    console.log(page);
    this.postPerPage = page.pageSize;
    this.currentIndex = page.pageIndex + 1;
    this.isLoading = true;
    this.postService.getPosts(this.postPerPage, this.currentIndex);
    this.postsUpdated = this.postService.getUpdatedPosts().subscribe(
      (data: { posts: Array<Post>, postsCount: number }) => {
        this.posts = data.posts;
        this.totalPosts = data.postsCount;
        this.isLoading = false;
      }
    )
  }

  ngOnDestroy() {
    this.postsUpdated.unsubscribe();
  }

}
