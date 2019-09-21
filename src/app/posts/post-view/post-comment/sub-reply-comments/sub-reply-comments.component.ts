import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sub-reply-comments',
  templateUrl: './sub-reply-comments.component.html',
  styleUrls: ['./sub-reply-comments.component.css']
})
export class SubReplyCommentsComponent implements OnInit {

  comment: string = " ";
  @ViewChild('f') subform: NgForm;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.comment = this.subform.value.comment;
  }
}
