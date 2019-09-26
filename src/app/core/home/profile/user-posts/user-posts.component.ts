import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/posts/posts.service';
import { Post } from 'src/app/posts/post.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  posts: Post[] = [];
  postsSub: Subscription;
  isLoading: boolean = true;

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.postService.getPostByCreatorId();
    this.posts = this.postService.getStaticUsersPosts();
    this.postsSub = this.postService.getUsersPostListener().subscribe(
      (posts) => {
        this.posts = posts;
        this.isLoading = false;
      }
    )
  }

  navigate(id: string) {
    this.router.navigate(['/', 'view', id]);
  }

}
