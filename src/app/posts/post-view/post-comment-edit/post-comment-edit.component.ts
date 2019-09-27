import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommentService } from '../post-comment/comment.service';
import { Comment } from '../post-comment/comment.model';
import { Subscription } from 'rxjs';
import {
  ToolbarService,
  LinkService,
  ImageService,
  HtmlEditorService,
  TableService,
  QuickToolbarService
} from '@syncfusion/ej2-angular-richtexteditor';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-comment-edit',
  templateUrl: './post-comment-edit.component.html',
  styleUrls: ['./post-comment-edit.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, TableService, QuickToolbarService]
})
export class PostCommentEditComponent implements OnInit {

  comment: Comment;
  commentSub: Subscription;
  public tools: object = {
    items: ['Undo', 'Redo', '|',
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'SubScript', 'SuperScript', '|',
      'LowerCase', 'UpperCase', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|', 'CreateLink', 'CreateTable',
      'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
  };

  public quickTools: object = {
    image: [
      'Replace', 'Align', 'Caption', 'Remove', 'InsertLink', '-', 'Display', 'AltText', 'Dimension']
  };
  @ViewChild('f') form: NgForm;
  contentData: string = " ";

  id: string = " ";

  constructor(private router: Router, private route: ActivatedRoute, private commentService: CommentService) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['commentID'];
      }
    );

    this.commentService.getCommentById(this.id);
    this.comment = this.commentService.getStaticComment();
    this.commentSub = this.commentService.getCommentListener().subscribe(
      (comment: Comment) => {
        this.comment = comment;
        this.contentData = this.comment.content;
      }
    )
  }

  navigate() {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }

  onSubmit() {
    let content = this.form.value.content;
    this.commentService.updateCommentById(this.id, content ? content : this.contentData);
  }
}
