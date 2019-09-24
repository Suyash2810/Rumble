import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../error/error.component';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class PostService {

    private posts: Array<Post> = [];
    private post: Post;
    private nextUpdatedPost = new Subject<{ posts: Array<Post>, postsCount: number }>();
    private nextSinglePost = new Subject<Post>();

    constructor(private httpClient: HttpClient, public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
    }

    getPosts(pageSize: number, currentPageIndex: number) {
        const pagesize = pageSize;
        const page = currentPageIndex;
        const queryParams = `?pagesize=${pagesize}&page=${page}`;
        type recievedPostType = { status: string, content: any, maxPosts: number };
        this.httpClient.get<recievedPostType>('http://localhost:3000/posts' + queryParams)
            .pipe(
                map(
                    (posts) => {
                        return {
                            posts: posts.content.map(
                                (post) => {
                                    return {
                                        id: post._id,
                                        username: post.username,
                                        title: post.title,
                                        description: post.description,
                                        content: post.content,
                                        imagePath: post.imagePath,
                                        creator_id: post.creator_id,
                                        createdAt: post.createdAt,
                                        commentStatus: post.commentStatus
                                    }
                                }
                            ),
                            maxposts: posts.maxPosts
                        }
                    }
                )
            )
            .subscribe(
                (transformedPostData) => {
                    this.posts = transformedPostData.posts;
                    this.nextUpdatedPost.next({ posts: [...this.posts], postsCount: transformedPostData.maxposts });
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
                            username: data.post.username,
                            title: data.post.title,
                            description: data.post.description,
                            content: data.post.content,
                            imagePath: data.post.imagePath,
                            creator_id: data.post.creator_id,
                            createdAt: data.post.createdAt,
                            commentStatus: data.post.commentStatus
                        }
                    }
                )
            )
            .subscribe(
                (transformedPost) => {
                    this.post = transformedPost;
                    this.nextSinglePost.next({ ...this.post });
                },
                error => {
                    this.dialog.open(ErrorComponent, {
                        data: {
                            message: "The post cannot be retreived or does not exist."
                        }
                    });

                    this.router.navigate(['/'], { relativeTo: this.route });
                }
            )
    }

    getOnePost() {
        return this.nextSinglePost.asObservable();
    }

    getUpdatedPostsStatic() {
        return this.posts.slice();
    }

    getUpdatedPosts() {
        return this.nextUpdatedPost.asObservable();
    }

    addPost(username: string, title: string, content: string, description: string, image: File) {

        let postData = new FormData();
        if (title !== null) {
            postData.append("title", title);
        }

        if (content !== null) {
            postData.append("content", content);
        }

        if (description !== null) {
            postData.append('description', description);
        }

        if (username !== null) {
            postData.append('username', username);
        }

        postData.append("image", image, title);

        type responseType = { message: string, post: any };
        this.httpClient.post<responseType>('http://localhost:3000/posts', postData)
            .subscribe(
                (result) => {
                    console.log(result);
                },
                error => {
                    let errorPath = error.error.error.errors;
                    let message = ``;
                    Object.keys(errorPath).forEach(
                        (key) => {
                            message += errorPath[key].message + ` `;
                        }
                    );
                    this.dialog.open(ErrorComponent, {
                        data: {
                            message: message
                        }
                    })
                }
            )
    }

    deletePost(id: String) {
        return this.httpClient.delete('http://localhost:3000/posts/' + id);
    }

    updatePost(id: string, title: string, description: string, content: string, image: File) {

        const postData = new FormData();
        postData.append("title", title);
        postData.append("content", content);
        postData.append("image", image);
        postData.append('description', description);

        type updateResponseType = { success: string, post: any };

        this.httpClient.patch<updateResponseType>('http://localhost:3000/posts/' + id, postData)
            .pipe(
                map(
                    (result) => {
                        console.log(result);
                        return {
                            id: result.post._id,
                            title: result.post.title,
                            content: result.post.content,
                            imagePath: result.post.imagePath,
                            creator_id: result.post.creator_id
                        }
                    }
                )
            )
            .subscribe(
                (transformedPost) => {
                    console.log(transformedPost);
                }
            )
    }

    commentStatus(status: boolean) {

    }
}