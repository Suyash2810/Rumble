import { Component, OnInit } from '@angular/core';
import { PostService } from '../posts.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  postId: string;
  post: Post;
  PostSubs: Subscription;
  isLoading: boolean = true;

  constructor(private postService: PostService, private authService: AuthService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.postId = params['postID'];
      }
    );

    this.postService.getPost(this.postId);
    this.PostSubs = this.postService.getOnePost().subscribe(
      (post: Post) => {
        this.post = post;
        this.isLoading = false;
      }
    );
  }

}
