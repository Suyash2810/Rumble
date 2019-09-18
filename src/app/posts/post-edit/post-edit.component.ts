import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../posts.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { mimeType } from '../post-create/mime-type.validator';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit, OnDestroy {

  id: string;
  titleData: string;
  contentData: string;
  descriptionData: string;
  imageData: string;
  imagePreview: string;
  requestedPost: Subscription;
  isLoading: Boolean = false;
  form: FormGroup;

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      content: new FormControl(null, { validators: [Validators.required] }),
      description: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
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
        this.descriptionData = post.description;
        this.contentData = post.content;
        this.imageData = post.imagePath;
        this.isLoading = false;
      }
    );
  }

  onSubmit() {
    this.titleData = this.form.value.title !== null ? this.form.value.title : this.titleData;
    this.contentData = this.form.value.content !== null ? this.form.value.content : this.contentData;
    this.descriptionData = this.form.value.description !== null ? this.form.value.description : this.descriptionData;
    this.postService.updatePost(this.id, this.titleData, this.descriptionData, this.contentData, this.form.value.image);
    this.form.reset();
    this.router.navigate(['/']);
  }

  onUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = (reader.result as string)
    }
    reader.readAsDataURL(file);
  }

  ngOnDestroy() {
    this.requestedPost.unsubscribe();
  }
}
