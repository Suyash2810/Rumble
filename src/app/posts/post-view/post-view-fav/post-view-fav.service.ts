import { Injectable } from "@angular/core";
import { ViewFav } from './post-view-fav.model';
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })

export class ViewFavService {

    constructor(private httpClient: HttpClient) { }

    getData() {

        type responseType = { status: string, data: ViewFav };

        this.httpClient.get<responseType>('http://localhost:3000/getPostViewData')
            .subscribe(
                (response) => {
                    console.log(response);
                }
            );
    }

    updateViews(post_id: string) {

        type responseType = { status: string, data: ViewFav };

        this.httpClient.patch<responseType>('http://localhost:3000/updateViewData', { post_id: post_id })
            .subscribe(
                (response) => {
                    console.log(response);
                }
            );
    }

    createViewFavData(post_id: string) {

        type responseType = { status: string, data: ViewFav };

        this.httpClient.post<responseType>('http://localhost:3000/createViewFavData', { post_id: post_id })
            .subscribe(
                (response) => {
                    console.log(response);
                }
            );
    }

    updateFavorites(post_id: string) {

        type responseType = { status: string, data: ViewFav };

        this.httpClient.patch<responseType>("http://localhost:3000/updateFavData", { post_id: post_id })
            .subscribe(
                (response) => {

                    console.log(response);
                }
            );
    }
}