import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  ToolbarService,
  LinkService,
  ImageService,
  HtmlEditorService,
  TableService,
  QuickToolbarService
} from '@syncfusion/ej2-angular-richtexteditor';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { CommentService } from './comment.service';
import { Comment } from './comment.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, TableService, QuickToolbarService]
})
export class PostCommentComponent implements OnInit, OnDestroy {

  comment: string = " ";
  userID: string = " ";
  username: string = " ";
  @ViewChild('f') form: NgForm;
  comments: Array<Comment> = [];
  commentSubs: Subscription;
  isLoading: boolean = true;

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

  constructor(private authService: AuthService, private commentService: CommentService) { }

  ngOnInit() {
    this.userID = this.authService.getCurrentUserId();
    this.username = this.authService.getCurrentUsername();
    this.commentService.getComments();
    this.comments = this.commentService.getSavedComments();
    this.commentSubs = this.commentService.getCommentsListener().subscribe(
      (result) => {
        const comments: Array<Comment> = result;
        this.comments = comments;
        console.log(this.comments);
        this.isLoading = false;
      }
    )
  }

  onSubmit() {
    this.comment = this.form.value.comment;
    this.commentService.addComment(this.username, null, this.comment, this.userID);
  }

  ngOnDestroy() {
    this.commentSubs.unsubscribe();
  }
}
