import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../posts.service';
import { PageEvent } from "@angular/material";
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

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
  loggedIn: boolean = false;
  authenticationSubscription: Subscription;
  userId: string;

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getCurrentUserId();

    this.postService.getPosts(this.postPerPage, this.currentIndex);
    this.postsUpdated = this.postService.getUpdatedPosts().subscribe(
      (data: { posts: Array<Post>, postsCount: number }) => {
        this.posts = data.posts;
        this.totalPosts = data.postsCount;
        this.isLoading = false;
      }
    )

    this.loggedIn = this.authService.getAuth();
    this.authenticationSubscription = this.authService.getAuthenticatedListener().subscribe(
      (logged) => {
        if (logged) {
          this.loggedIn = true;
          this.userId = this.authService.getCurrentUserId();
        }
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
    this.authenticationSubscription.unsubscribe();
  }

}
