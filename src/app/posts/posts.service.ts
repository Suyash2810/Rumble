import { Post, PostModel } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class PostService {

    private posts: Array<Post> = [];
    private nextUpdatedPost = new Subject<Array<Post>>();

    constructor(private httpClient: HttpClient) {
    }

    getPosts() {
        type recievedPostType = { status: String, content: Array<Post> };
        this.httpClient.get<recievedPostType>('http://localhost:3000/posts')
            .subscribe(
                (posts) => {
                    this.posts = posts.content;
                }
            )
    }

    getUpdatedPosts() {
        return this.nextUpdatedPost.asObservable();
    }

    addPost(title: String, content: String) {
        let post: Post = new PostModel(null, title, content);
        this.posts.push(post);
        this.nextUpdatedPost.next([...this.posts]);
    }
}