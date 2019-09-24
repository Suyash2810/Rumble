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
import { Params, ActivatedRoute } from '@angular/router';
import { PostService } from '../../posts.service';

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
  checked: boolean = false;
  postID: string = " ";
  postCreatorId: string = " ";

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

  constructor(private authService: AuthService, private commentService: CommentService, private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {
    this.userID = this.authService.getCurrentUserId();
    this.username = this.authService.getCurrentUsername();

    this.route.params.subscribe(
      (params: Params) => {
        this.postID = params['postID'];
      }
    );

    this.commentService.getComments(this.postID);
    this.comments = this.commentService.getSavedComments();
    this.commentSubs = this.commentService.getCommentsListener().subscribe(
      (result) => {
        const comments: Array<Comment> = result;
        this.comments = comments;
        console.log(this.comments);
        this.isLoading = false;
      }
    );

    this.postService.getPost(this.postID);
    this.postService.getOnePost().subscribe(
      (post) => {
        this.postCreatorId = post.creator_id;
        this.checked = post.commentStatus;
      }
    );
  }

  onSubmit() {
    this.comment = this.form.value.comment;
    this.commentService.addComment(this.username, null, this.comment, this.userID, this.postID);
  }

  toggleChecked() {
    this.checked = !this.checked;
    this.postService.commentStatus(this.checked, this.postID, this.postCreatorId);
  }

  ngOnDestroy() {
    this.commentSubs.unsubscribe();
  }
}
