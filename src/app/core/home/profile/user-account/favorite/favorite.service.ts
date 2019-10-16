import { Injectable } from "@angular/core";
import { Favorite } from "./favorite.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Post } from "src/app/posts/post.model";
import { AuthService } from "src/app/auth/auth.service";

@Injectable({ providedIn: 'root' })

export class FavoriteService {

    private favorites: Array<Favorite> = [];
    private favoriteListener = new Subject<Array<Favorite>>();

    constructor(private httpClient: HttpClient, private authService: AuthService) { }
    getFavorites() {

        type responseType = { status: string, favorites: any };

        this.httpClient.get<responseType>("http://localhost:3000/favorites")
            .pipe(
                map(
                    (data) => {
                        return data.favorites.map(
                            (favorite) => {
                                return {
                                    id: favorite._id,
                                    username: favorite.username,
                                    title: favorite.title,
                                    description: favorite.description,
                                    postId: favorite.postId,
                                    userId: favorite.userId
                                }
                            }
                        )
                    }
                )
            )
            .subscribe(
                (transformedFavorites) => {
                    this.favorites = transformedFavorites;
                    this.favoriteListener.next([...this.favorites]);
                }
            );
    }

    getStaticFavorites() {
        return this.favorites;
    }

    getfavoritesListener() {
        return this.favoriteListener.asObservable();
    }

    addFavorite(post: Post) {

        const userId = this.authService.getCurrentUserId();

        const data = {
            username: post.username,
            title: post.title,
            description: post.description,
            postId: post.id,
            userId: userId
        }

        type responseType = { status: string, favorite: any };

        this.httpClient.post<responseType>("http://localhost:3000/favorite", data)
            .pipe(
                map(
                    (data) => {
                        return {
                            id: data.favorite._id,
                            username: data.favorite.username,
                            title: data.favorite.title,
                            description: data.favorite.description,
                            postId: data.favorite.id,
                            userId: data.favorite.userId
                        }
                    }
                )
            )
            .subscribe(
                (transformedFavorite) => {
                    this.favorites.push(transformedFavorite);
                    this.favoriteListener.next([...this.favorites]);
                }
            );
    }
}