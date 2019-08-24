import { Post, PostModel } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class PostService {

    private posts: Array<Post> = [];
    private nextUpdatedPost = new Subject<Array<Post>>();

    constructor(private httpClient: HttpClient) {
    }

    getPosts() {
        type recievedPostType = { status: String, content: any };
        this.httpClient.get<recievedPostType>('http://localhost:3000/posts')
            .pipe(
                map(
                    (posts) => {
                        return posts.content.map(
                            (post) => {
                                return {
                                    id: post._id,
                                    title: post.title,
                                    content: post.content
                                }
                            }
                        )
                    }
                )
            )
            .subscribe(
                (transformedPostData) => {
                    this.posts = transformedPostData;
                    this.nextUpdatedPost.next([...this.posts]);
                }
            )
    }

    getUpdatedPosts() {
        return this.nextUpdatedPost.asObservable();
    }

    addPost(title: String, content: String) {
        let postData: Post = new PostModel(null, title, content);
        type responseType = { message: String, post: any };
        this.httpClient.post<responseType>('http://localhost:3000/posts', postData)
            .subscribe(
                (result) => {
                    console.log(result.post);
                    let post: Post = {
                        id: result.post._id,
                        title: result.post.title,
                        content: result.post.content
                    };
                    this.posts.push(post);
                    this.nextUpdatedPost.next([...this.posts]);
                }
            )
    }

    deletePost(id: String) {
        this.httpClient.delete('http://localhost:3000/posts/' + id)
            .subscribe(
                (result) => {
                    console.log(result);
                    const updatedPosts = this.posts.filter(post => post.id !== id);
                    this.posts = updatedPosts;
                    this.nextUpdatedPost.next([...this.posts]);
                }
            );
    }
}