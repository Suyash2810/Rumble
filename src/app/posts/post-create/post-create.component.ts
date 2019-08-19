import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostService } from "../posts.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {

  title: String = " ";
  content: String = " ";
  @ViewChild('f') postForm: NgForm;

  constructor(private postService: PostService) { }

  ngOnInit() { }

  onSubmit() {
    this.title = this.postForm.value.title;
    this.content = this.postForm.value.content;
    this.postService.addPost(this.title, this.content);
  }
}
