import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Reply } from "./reply.model";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { MatDialog } from "@angular/material";
import { ErrorComponent } from "src/app/error/error.component";

@Injectable({ providedIn: "root" })

export class ReplyService {

    replies: Array<Reply> = [];
    repliesListener = new Subject<Array<Reply>>();

    constructor(private httpClient: HttpClient, private dialog: MatDialog) { }

    addReply(content: string, postId: string, parent_Id: string) {

        type responseType = { status: string, reply: any };

        let data = {
            content,
            postId,
            parent_Id
        };

        this.httpClient.post<responseType>("http://localhost:3000/reply", data)
            .pipe(
                map(
                    (data) => {
                        return {
                            id: data.reply._id,
                            username: data.reply.username,
                            imagePath: data.reply.imagePath,
                            content: data.reply.content,
                            createdAt: data.reply.createdAt,
                            creator_id: data.reply.creator_id,
                            postId: data.reply.postId,
                            parent_Id: data.reply.parent_Id
                        }
                    }
                )
            )
            .subscribe(
                (transformedReply) => {
                    this.replies.push(transformedReply);
                    this.repliesListener.next([...this.replies]);
                },
                (error) => {
                    this.dialog.open(ErrorComponent, {
                        data: {
                            message: error.error.error.message
                        }
                    });
                }
            );
    }
}