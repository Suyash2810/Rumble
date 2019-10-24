import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavoriteService } from './favorite.service';
import { Favorite } from './favorite.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit, OnDestroy {

  favorites: Favorite[] = [];
  favoriteSub: Subscription;

  constructor(private favoriteService: FavoriteService) { }

  ngOnInit() {

    this.favoriteService.getFavorites();
    this.favorites = this.favoriteService.getStaticFavorites();
    this.favoriteSub = this.favoriteService.getfavoritesListener().subscribe(
      (favorites) => {
        this.favorites = favorites;
      }
    )
  }

  ngOnDestroy() {
    this.favoriteSub.unsubscribe();
  }

  removeFavorite(postId: string) {
    this.favoriteService.removeFavorite(postId);
  }
}
