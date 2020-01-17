import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewFavService } from './post-view-fav.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { ViewFav } from './post-view-fav.model';

@Component({
  selector: 'app-post-view-fav',
  templateUrl: './post-view-fav.component.html',
  styleUrls: ['./post-view-fav.component.css']
})
export class PostViewFavComponent implements OnInit, OnDestroy {

  private postId: string;
  private postIdSub: Subscription;
  private viewFav: ViewFav;
  private viewFavSub: Subscription;
  private views: number;
  private favorites: number;

  constructor(private viewFavService: ViewFavService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.postId = this.route.snapshot.params['postID'];

    this.postIdSub = this.route.params
      .subscribe(
        (params: Params) => {
          this.postId = params['postID'];
        }
      )

    this.viewFavService.getData(this.postId);

    this.viewFav = this.viewFavService.getStaticPostData();

    this.viewFavSub = this.viewFavService.getListenerPostData()
      .subscribe(
        (data) => {
          this.viewFav = data;
          this.views = this.viewFav.views;
          this.favorites = this.viewFav.favorites;
        }
      )
  }

  ngOnDestroy() {

    this.postIdSub.unsubscribe();
    this.viewFavSub.unsubscribe();
  }

}
