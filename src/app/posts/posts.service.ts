import { Post, PostModel } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class PostService {

    private posts: Array<Post> = [];
    private nextUpdatedPost = new Subject<Array<Post>>();

    getPosts() {
        return this.posts;
    }

    getUpdatedPosts() {
        return this.nextUpdatedPost.asObservable();
    }

    addPost(title: String, content: String) {
        let post: Post = new PostModel(title, content);
        this.posts.push(post);
        this.nextUpdatedPost.next([...this.posts]);
    }
}