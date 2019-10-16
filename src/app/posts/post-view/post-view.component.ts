import { Component, OnInit } from '@angular/core';
import { PostService } from '../posts.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';
import { FavoriteService } from 'src/app/core/home/profile/user-account/favorite/favorite.service';

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
  toggleFav: boolean = false;

  constructor(private postService: PostService, private route: ActivatedRoute, private favoriteService: FavoriteService) { }

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

  toggleFavorite() {
    this.toggleFav = !this.toggleFav;
    if (this.toggleFav) {
      this.favoriteService.addFavorite(this.post);
    } else {
      this.favoriteService.removeFavorite(this.postId);
    }
  }

}
