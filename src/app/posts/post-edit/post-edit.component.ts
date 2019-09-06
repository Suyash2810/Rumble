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
      }
    );
  }

  onSubmit() {
    this.titleData = this.postForm.value.title;
    this.contentData = this.postForm.value.content;
    this.postService.updatePost(this.id, this.titleData, this.contentData);
    this.postForm.reset();
  }

  ngOnDestroy() {
    this.requestedPost.unsubscribe();
  }
}
