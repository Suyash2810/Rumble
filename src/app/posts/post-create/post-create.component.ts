import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {

  newPost: String;

  constructor() { }

  ngOnInit() { }

  onAddPostSubmit() {
    this.newPost = "This is a new user\'s post";
  }
}
