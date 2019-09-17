import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../posts.service';
import { PageEvent, MatDialog } from "@angular/material";
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorComponent } from 'src/app/error/error.component';

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
  postPerPage: number = 5;
  currentIndex: number = 1;
  postSize: Array<number> = [1, 2, 5, 10];
  loggedIn: boolean = false;
  authenticationSubscription: Subscription;
  userId: string;

  constructor(private postService: PostService, private authService: AuthService,
    private router: Router, private route: ActivatedRoute, public dialog: MatDialog) { }

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
      (result) => {
        this.postService.getPosts(this.postPerPage, this.currentIndex);
        console.log(result);
      },
      error => {
        this.dialog.open(ErrorComponent, {
          data: {
            message: "Unauthorized user. Data cannot be deleted."
          }
        })
      }
    );
  }

  onEditCheck(postId: string, creatorId: string) {

    if (creatorId == this.userId) {
      this.router.navigate(['edit', postId], { relativeTo: this.route });
    } else {
      this.dialog.open(ErrorComponent, {
        data: {
          message: "Unauthorized user. Cannot edit the post."
        }
      });

      this.router.navigate(['/']);
    }
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

  onViewPost(id: string) {
    this.router.navigate(['view', id], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.postsUpdated.unsubscribe();
    this.authenticationSubscription.unsubscribe();
  }

}
