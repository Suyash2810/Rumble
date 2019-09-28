import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Comment } from './comment.model';
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { MatDialog } from "@angular/material";
import { ErrorComponent } from "src/app/error/error.component";

@Injectable({ providedIn: "root" })

export class CommentService {

    private comments: Array<Comment> = [];
    private commentsListener = new Subject<Array<Comment>>();
    private comment: Comment;
    private commentListener = new Subject<Comment>();

    constructor(private httpClient: HttpClient, private dialog: MatDialog) { }

    getSavedComments() {
        return this.comments;
    }

    getCommentsListener() {
        return this.commentsListener.asObservable();
    }

    addComment(username: string, imagePath: string, content: string, creator_id: string, postId: string) {

        let data = {
            username,
            imagePath,
            content,
            creator_id,
            postId
        };

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
                            creator_id: data.comment.creator_id,
                            postId: data.comment.postId
                        }
                    }
                )
            )
            .subscribe(
                (transformedComment) => {
                    const comment: Comment = transformedComment;
                    this.comments.push(comment);
                    this.commentsListener.next([...this.comments]);

                    console.log(this.comments);
                },
                (error) => {
                    this.dialog.open(ErrorComponent, {
                        data: {
                            message: error.error.error.message
                        }
                    })
                }
            );
    }

    getComments(postId: string) {
        type responseType = { status: string, comments: any };
        this.httpClient.get<responseType>('http://localhost:3000/comment/' + postId)
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
                                    creator_id: comment.creator_id,
                                    postId: comment.postId
                                }
                            }
                        )
                    }
                )
            )
            .subscribe(
                (transformedCommentData) => {

                    let comments: Array<Comment> = transformedCommentData;
                    this.comments = comments;
                    this.commentsListener.next([...this.comments]);
                },
                (error) => {
                    this.dialog.open(ErrorComponent, {
                        data: {
                            message: error.error.error.message
                        }
                    })
                }
            )
    }

    getCommentById(id: string) {
        type responseType = { status: string, comment: any };
        this.httpClient.get<responseType>('http://localhost:3000/commentById/' + id)
            .pipe(
                map(
                    (data) => {
                        return {
                            id: data.comment._id,
                            username: data.comment.username,
                            imagePath: data.comment.imagePath,
                            content: data.comment.content,
                            createdAt: data.comment.createdAt,
                            creator_id: data.comment.creator_id,
                            postId: data.comment.postId
                        }
                    }
                )
            )
            .subscribe(
                (transformedComment: Comment) => {
                    this.comment = transformedComment;
                    this.commentListener.next(this.comment);
                },
                (error) => {
                    this.dialog.open(ErrorComponent, {
                        data: {
                            message: "The comment could not be fetched."
                        }
                    })
                }
            )
    }

    getStaticComment() {
        return this.comment;
    }

    getCommentListener() {
        return this.commentListener.asObservable();
    }

    updateCommentById(id: string, content: string) {

        type responseType = { status: string, comment: any };
        let data = {
            content
        };

        return this.httpClient.patch<responseType>("http://localhost:3000/updateComment/" + id, data);
    }

    deleteComment(id: string, creatorId: string) {

        type responseType = { status: string, comment: any };

        this.httpClient.delete<responseType>(`http://localhost:3000/commentDelete/${id}/${creatorId}`)
            .pipe(
                map(
                    (data) => {
                        return {
                            id: data.comment._id,
                            username: data.comment.username,
                            imagePath: data.comment.imagePath,
                            content: data.comment.content,
                            createdAt: data.comment.createdAt,
                            creator_id: data.comment.creator_id,
                            postId: data.comment.postId
                        }
                    }
                )
            )
            .subscribe(
                (transformedDeletedComment) => {
                    console.log(transformedDeletedComment);
                }
            )
    }
}