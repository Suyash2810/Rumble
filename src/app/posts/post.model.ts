export interface Post {
    id: string,
    title: string,
    content: string,
    imagePath: string,
    creator_id: string
}

export class PostModel implements Post {

    title: string;
    content: string;
    id: string;
    imagePath: string;
    creator_id: string;

    constructor(id: string, title: string, content: string, imagePath: string) {
        this.title = title;
        this.content = content;
        this.id = id;
        this.imagePath = imagePath;
    }
}