export interface Post {
    id: string,
    username: string,
    title: string,
    description: string,
    content: string,
    imagePath: string,
    creator_id: string,
    createdAt: string
}

export class PostModel implements Post {

    title: string;
    content: string;
    id: string;
    imagePath: string;
    creator_id: string;
    username: string;
    description: string;
    createdAt: string;

    constructor(id: string, username: string, title: string, description: string, content: string, imagePath: string, creator_id: string, createdAt: string) {
        this.title = title;
        this.content = content;
        this.id = id;
        this.imagePath = imagePath;
        this.username = username;
        this.creator_id = creator_id;
        this.description = description;
        this.createdAt = createdAt;
    }
}