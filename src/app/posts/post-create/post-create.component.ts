import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostService } from "../posts.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {

  title: String = " ";
  content: String = " ";
  form: FormGroup;

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required] })
    })
  }

  uploadImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    console.log(this.form);
    console.log(file);
  }

  onSubmit() {
    this.title = this.form.value.title;
    this.content = this.form.value.content;
    this.postService.addPost(this.title, this.content);
    this.form.reset();
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
