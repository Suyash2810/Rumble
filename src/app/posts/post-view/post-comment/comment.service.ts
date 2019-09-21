import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Comment, CommentModel } from './comment.model';
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })

export class CommentService {


    constructor(private httpClient: HttpClient) { }

    addComment(username: string, imagePath: string, content: string, creator_id: string) {
        let data: Comment = new CommentModel(username, imagePath, content, creator_id);
        type responseType = { status: string, comment: any };

        this.httpClient.post<responseType>('http://localhost:3000/comment', data)
            .pipe(
                map(
                    (data) => {
                        return {
                            id: data.comment._id,
                            username: data.comment.username,
                            imagePath: data.comment.imagePath,
                            content: data.comment.content,
                            createdAt: data.comment.createdAt,
                            creator_id: data.comment.creator_id
                        }
                    }
                )
            )
            .subscribe(
                (transformedComment) => {
                    console.log(transformedComment);
                }
            );
    }

    getComments() {
        type responseType = { status: string, comments: any };
        this.httpClient.get<responseType>('http://localhost:3000/comment')
            .pipe(
                map(
                    (data) => {
                        return data.comments.map(
                            (comment) => {
                                return {
                                    id: comment._id,
                                    username: comment.username,
                                    imagePath: comment.imagePath,
                                    content: comment.content,
                                    createdAt: comment.createdAt,
                                    creator_id: comment.creator_id
                                }
                            }
                        )
                    }
                )
            )
            .subscribe(
                (transformedCommentData) => {
                    console.log(transformedCommentData);
                }
            )
    }

    getCommentById(id: string) {
        type responseType = { status: string, comment: any };
        this.httpClient.get<responseType>('http://localhost:3000/comment/' + id)
            .pipe(
                map(
                    (data) => {
                        return {
                            id: data.comment._id,
                            username: data.comment.username,
                            imagePath: data.comment.imagePath,
                            content: data.comment.content,
                            createdAt: data.comment.createdAt,
                            creator_id: data.comment.creator_id
                        }
                    }
                )
            )
            .subscribe(
                (transformedComment) => {
                    console.log(transformedComment);
                }
            )
    }
}