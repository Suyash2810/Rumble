import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../posts.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit, OnDestroy {

  id: String;
  titleData: String;
  contentData: String;
  requestedPost: Subscription;
  @ViewChild('f') postForm: NgForm;

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['postID'];
        }
      )

    this.postService.getPost(this.id);
    this.requestedPost = this.postService.getOnePost().subscribe(
      (post: Post) => {
        this.titleData = post.title;
        this.contentData = post.content;
        console.log(post);
      }
    );
  }

  onSubmit() {
    // this.title = this.postForm.value.title;
    // this.content = this.postForm.value.content;
    // this.postService.addPost(this.title, this.content);
    // this.postForm.reset();
  }

  ngOnDestroy() {
    this.requestedPost.unsubscribe();
  }
}
