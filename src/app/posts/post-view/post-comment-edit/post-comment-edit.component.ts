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
import { map } from 'rxjs/operators';
import { ErrorComponent } from 'src/app/error/error.component';
import { MatDialog } from '@angular/material';

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

  constructor(private router: Router, private route: ActivatedRoute, private commentService: CommentService, private dialog: MatDialog) { }

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
    this.commentService.updateCommentById(this.id, content ? content : this.contentData)
      .pipe(
        map(
          (data) => {
            return {
              id: data.comment._id,
              username: data.comment.username,
              imagePath: data.comment.imagePath,
              content: data.comment.content,
              createdAt: data.comment.createdAt,
              creator_id: data.comment.creator_id,
              postId: data.comment.postId
            }
          }
        )
      )
      .subscribe(
        (transformedComment) => {
          console.log(transformedComment);
          this.navigate();
        },
        (error) => {
          this.dialog.open(ErrorComponent, {
            data: {
              message: "The comment could not be updated."
            }
          });
        }
      );
  }
}
