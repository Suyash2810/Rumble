import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { PostModel, Post } from '../post.model';

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {

  title: String = " ";
  content: String = " ";
  @Output() postData = new EventEmitter<Post>();

  constructor() { }

  ngOnInit() { }

  onAddPostSubmit() {
    this.postData.emit(new PostModel(this.title, this.content));
  }
}
