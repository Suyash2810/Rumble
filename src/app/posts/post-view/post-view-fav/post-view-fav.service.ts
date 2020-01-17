import { Injectable } from "@angular/core";
import { ViewFav } from './post-view-fav.model';
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })

export class ViewFavService {

    private viewFav: ViewFav;
    private viewFavListener = new Subject<ViewFav>();

    constructor(private httpClient: HttpClient) { }

    getData(postId: string) {

        type responseType = { status: string, data: any };

        this.httpClient.get<responseType>('http://localhost:3000/getPostViewData')
            .subscribe(
                (response) => {

                    let viewfavs = response.data;
                    let viewFav = viewfavs.find((vf) => {
                        return vf.parent_post_id === postId;
                    });

                    this.viewFav = viewFav;
                    this.viewFavListener.next(this.viewFav);
                }
            );
    }

    getStaticPostData() {

        return this.viewFav;
    }

    getListenerPostData() {
        return this.viewFavListener.asObservable();
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

    updateFavorites(post_id: string, change: number) {

        type responseType = { status: string, data: ViewFav };

        this.httpClient.patch<responseType>("http://localhost:3000/updateFavData", { post_id: post_id, change: change })
            .subscribe(
                (response) => {

                    console.log(response);
                }
            );
    }

    deleteViewFavData(post_id: string) {

        type responseType = { status: string };

        this.httpClient.delete<responseType>(`http://localhost:3000/deleteViewFavData/${post_id}`)
            .subscribe(
                (data) => {

                    console.log(data);
                }
            );
    }
}