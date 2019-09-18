import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostService } from "../posts.service";
import { ActivatedRoute, Router } from "@angular/router";
import { mimeType } from './mime-type.validator';
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {

  title: string = " ";
  content: string = " ";
  description: string = " ";
  username: string = " ";
  previewImage: string = " ";
  form: FormGroup;
  loggedIn: boolean = false;

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {

    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      content: new FormControl(null, { validators: [Validators.required] }),
      description: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });

    this.username = this.authService.getCurrentUsername();
  }

  uploadImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = (reader.result as string);
    }
    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.title = this.form.value.title;
    this.content = this.form.value.content;
    this.description = this.form.value.description;
    this.postService.addPost(this.username, this.title, this.content, this.description, this.form.value.image);
    this.form.reset();
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
