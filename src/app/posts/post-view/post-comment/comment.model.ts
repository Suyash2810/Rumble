export interface Comment {
    username: string;
    imagePath: string;
    creator_id: string;
    content: string;
}

export class CommentModel implements Comment {
    username: string;
    imagePath: string;
    creator_id: string;
    content: string;

    constructor(username: string, imagePath: string, content: string, creator_id: string) {
        this.username = username;
        this.imagePath = imagePath;
        this.creator_id = creator_id;
        this.content = content;
    }
}