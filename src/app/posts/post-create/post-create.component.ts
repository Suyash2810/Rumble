import { Component, OnInit, EventEmitter, Output, ViewChild } from "@angular/core";
import { PostModel, Post } from '../post.model';
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {

  title: String = " ";
  content: String = " ";
  @ViewChild('f') postForm: NgForm;

  @Output() postData = new EventEmitter<Post>();

  constructor() { }

  ngOnInit() { }

  onSubmit() {
    this.title = this.postForm.value.title;
    this.content = this.postForm.value.content;
    this.postData.emit(new PostModel(this.title, this.content));
  }
}
