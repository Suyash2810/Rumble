export interface Post {
    title: String,
    content: String
}

export class PostModel implements Post {

    title: String;
    content: String;

    constructor(title: String, content: String) {
        this.title = title;
        this.content = content;
    }
}