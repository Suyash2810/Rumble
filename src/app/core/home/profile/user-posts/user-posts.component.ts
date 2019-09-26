import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from 'src/app/posts/posts.service';
import { Post } from 'src/app/posts/post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  posts: Post[] = [];
  postsSub: Subscription;

  constructor(private authService: AuthService, private postService: PostService) { }

  ngOnInit() {
    this.postService.getPostByCreatorId();
    this.posts = this.postService.getStaticUsersPosts();
    this.postsSub = this.postService.getUsersPostListener().subscribe(
      (posts) => {
        this.posts = posts;
      }
    )
  }


}
