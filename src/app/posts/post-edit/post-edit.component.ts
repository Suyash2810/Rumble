import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../posts.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  isLoading: Boolean = false;
  form: FormGroup;

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      content: new FormControl(null, { validators: [Validators.required] })
    });

    this.isLoading = true;
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
        this.isLoading = false;
      }
    );
  }

  onSubmit() {
    this.titleData = this.form.value.title;
    this.contentData = this.form.value.content;
    this.postService.updatePost(this.id, this.titleData, this.contentData);
    this.form.reset();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.requestedPost.unsubscribe();
  }
}
