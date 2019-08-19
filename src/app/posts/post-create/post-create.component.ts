import { Component, OnInit, EventEmitter, Output } from "@angular/core";


@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {

  title: String = "";
  content: String = "";
  @Output() postData = new EventEmitter<{ title: String, content: String }>();

  constructor() { }

  ngOnInit() { }

  onAddPostSubmit() {
    this.postData.emit({ title: this.title, content: this.content });
  }
}
