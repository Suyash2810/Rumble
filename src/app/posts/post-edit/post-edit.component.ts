import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  title: String = " ";
  content: String = " ";
  @ViewChild('f') postForm: NgForm;

  constructor(private postService: PostService) { }

  ngOnInit() { }

  onSubmit() {
    this.title = this.postForm.value.title;
    this.content = this.postForm.value.content;
    this.postService.addPost(this.title, this.content);
    this.postForm.reset();
  }
}
