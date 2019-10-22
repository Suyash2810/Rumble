import { Injectable } from "@angular/core";
import { Favorite } from "./favorite.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Post } from "src/app/posts/post.model";
import { AuthService } from "src/app/auth/auth.service";
import { MatDialog } from "@angular/material";
import { ErrorComponent } from "src/app/error/error.component";

@Injectable({ providedIn: 'root' })

export class FavoriteService {

    private favorites: Array<Favorite> = [];
    private favoriteListener = new Subject<Array<Favorite>>();
    private favorite: Favorite;
    private favListener = new Subject<Favorite>();

    constructor(private httpClient: HttpClient, private authService: AuthService, private dialog: MatDialog) { }

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
                    console.log(transformedFavorites);
                    this.favorites = transformedFavorites;
                    this.favoriteListener.next([...this.favorites]);
                },
                error => {
                    this.dialog.open(ErrorComponent, {
                        data: {
                            message: "Data could not fetched from the database."
                        }
                    })
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
            .subscribe(
                () => {
                    this.getFavorites();
                },
                (error) => {
                    this.dialog.open(ErrorComponent, {
                        data: {
                            message: "Data could not be saved to the database."
                        }
                    })
                }
            );
    }

    removeFavorite(postId: string) {

        type responseType = { status: string, favorite: any };

        this.httpClient.delete<responseType>("http://localhost:3000/favorite/" + postId)
            .subscribe(
                (data) => {
                    this.getFavorites();
                },
                () => {
                    this.dialog.open(ErrorComponent, {
                        data: {
                            message: "Data could not be removed."
                        }
                    });
                }
            );
    }

    getFavoriteById(postId: string) {

        const userId = this.authService.getCurrentUserId();

        type responseType = { status: string, favorite: any };
        this.httpClient.get<responseType>(`http://localhost:3000/getFavoriteById/${postId}/${userId}`)
            .pipe(
                map(
                    (data) => {
                        if (data.favorite._id) {
                            return {
                                id: data.favorite._id,
                                username: data.favorite.username,
                                title: data.favorite.title,
                                description: data.favorite.description,
                                postId: data.favorite.postId,
                                userId: data.favorite.userId
                            }
                        } else {
                            return null;
                        }
                    }
                )
            )
            .subscribe(
                (transformedFavorite) => {
                    if (transformedFavorite) {

                        this.favorite = transformedFavorite;
                        this.favListener.next(this.favorite);
                    }
                }
            );
    }

    getStaticFavorite() {
        return this.favorite;
    }

    getFavListener() {
        return this.favListener.asObservable();
    }
}