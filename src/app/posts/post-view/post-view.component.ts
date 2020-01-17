import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../posts.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';
import { FavoriteService } from 'src/app/core/home/profile/user-account/favorite/favorite.service';
import { Favorite } from 'src/app/core/home/profile/user-account/favorite/favorite.model';
import { ViewFavService } from './post-view-fav/post-view-fav.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit, OnDestroy {

  postId: string;
  post: Post;
  PostSubs: Subscription;
  isLoading: boolean = true;
  toggleFav: boolean = false;
  favorite: Favorite;
  favSub: Subscription;

  constructor(private postService: PostService,
    private route: ActivatedRoute,
    private favoriteService: FavoriteService,
    private viewFavService: ViewFavService) { }

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

    this.favoriteService.getFavoriteById(this.postId);
    this.favorite = this.favoriteService.getStaticFavorite();
    this.favSub = this.favoriteService.getFavListener().subscribe(
      (favorite) => {
        this.favorite = favorite;
        if (this.favorite) {
          this.toggleFav = true;
        }
      }
    )
  }

  toggleFavorite() {
    this.toggleFav = !this.toggleFav;
    if (this.toggleFav) {
      this.favoriteService.addFavorite(this.post);
      this.viewFavService.updateFavorites(this.postId, 1);
    } else {
      this.favoriteService.removeFavorite(this.postId);
      this.viewFavService.updateFavorites(this.postId, -1);
    }
  }

  ngOnDestroy() {
    this.favSub.unsubscribe();
    this.PostSubs.unsubscribe();
  }
}
