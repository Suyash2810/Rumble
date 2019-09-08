import { Post, PostModel } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class PostService {

    private posts: Array<Post> = [];
    private post: Post;
    private nextUpdatedPost = new Subject<Array<Post>>();
    private nextSinglePost = new Subject<Post>();

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
                                    content: post.content,
                                    imagePath: post.imagePath
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

    getPost(id: any) {
        type receivedPostType = { success: String, post: any };
        this.httpClient.get<receivedPostType>(`http://localhost:3000/post/${id}`)
            .pipe(
                map(
                    (data) => {
                        return {
                            id: data.post._id,
                            title: data.post.title,
                            content: data.post.content,
                            imagePath: data.post.imagePath
                        }
                    }
                )
            )
            .subscribe(
                (transformedPost) => {
                    this.post = transformedPost;
                    this.nextSinglePost.next({ ...this.post });
                }
            )
    }

    getOnePost() {
        return this.nextSinglePost.asObservable();
    }

    getUpdatedPosts() {
        return this.nextUpdatedPost.asObservable();
    }

    addPost(title: string, content: string, image: File) {
        // let postData: Post = new PostModel(null, title, content);
        let postData = new FormData();
        postData.append("title", title);
        postData.append("content", content);
        postData.append("image", image, title);

        type responseType = { message: string, post: Post };
        this.httpClient.post<responseType>('http://localhost:3000/posts', postData)
            .subscribe(
                (result) => {
                    console.log(result.post);
                    const postSave: Post = {
                        id: result.post.id,
                        title: result.post.title,
                        content: result.post.content,
                        imagePath: result.post.imagePath
                    }

                    this.posts.push(postSave);
                    this.nextUpdatedPost.next([...this.posts]);
                }
            )
    }

    deletePost(id: String) {
        this.httpClient.delete('http://localhost:3000/posts/' + id)
            .subscribe(
                (result) => {
                    const updatedPosts = this.posts.filter(post => post.id !== id);
                    this.posts = updatedPosts;
                    this.nextUpdatedPost.next([...this.posts]);
                }
            );
    }

    updatePost(id: String, title: String, content: String) {

        const postData = {
            title: title,
            content: content
        }

        type updateResponseType = { success: String, post: any };

        this.httpClient.patch<updateResponseType>('http://localhost:3000/posts/' + id, postData)
            .pipe(
                map(
                    (result) => {
                        console.log(result);
                        return {
                            id: result.post._id,
                            title: result.post.title,
                            content: result.post.content,
                            imagePath: null
                        }
                    }
                )
            )
            .subscribe(
                (transformedPost) => {
                    const updatedPosts = this.posts.filter(post => post.id !== id);
                    updatedPosts.push(transformedPost);
                    this.posts = updatedPosts;
                    this.nextUpdatedPost.next([...this.posts]);
                }
            )
    }
}