export interface Post {
    id: String,
    title: String,
    content: String
}

export class PostModel implements Post {

    title: String;
    content: String;
    id: String;

    constructor(id: String, title: String, content: String) {
        this.title = title;
        this.content = content;
        this.id = id;
    }
}