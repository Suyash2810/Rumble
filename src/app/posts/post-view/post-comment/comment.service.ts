import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Comment, CommentModel } from './comment.model';

@Injectable({ providedIn: "root" })

export class CommentService {


    constructor(private httpClient: HttpClient) { }

    addComment(username: string, imagePath: string, content: string, creator_id: string) {
        let data: Comment = new CommentModel(username, imagePath, content, creator_id);
        type responseType = { status: string, comment: any };

        // this.httpClient.post<responseType>('http://localhost:3000/comment', data)
        console.log(data);
    }
}