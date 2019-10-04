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
import { User } from 'src/app/auth/user.model';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from 'src/app/error/error.component';

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
  isAuthenticated: boolean = false;
  authSub: Subscription;
  userInfo: User;
  toggleReply: boolean = false;
  replyUserId: string = " ";

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

  constructor(private authService: AuthService, private commentService: CommentService,
    private route: ActivatedRoute, private postService: PostService, private dialog: MatDialog) { }

  ngOnInit() {
    this.userID = this.authService.getCurrentUserId();
    this.username = this.authService.getCurrentUsername();
    this.authService.getUserInfo();
    this.userInfo = this.authService.getStaticUserInfo();
    this.authService.getUserInfoListener().subscribe(
      (user) => {
        this.userInfo = user;
        console.log(this.userInfo);
      }
    )

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

    this.isAuthenticated = this.authService.getAuth();
    this.authSub = this.authService.getAuthenticatedListener().subscribe(
      (auth: boolean) => {
        this.isAuthenticated = auth;
      }
    )
  }

  onSubmit() {
    this.comment = this.form.value.comment;
    this.commentService.addComment(this.username, this.userInfo.imagePath.length >= 1 ? this.userInfo.imagePath : 'https://www.w3schools.com/bootstrap4/img_avatar3.png', this.comment, this.userID, this.postID);
    this.form.reset();
  }

  toggleChecked() {
    this.checked = !this.checked;
    this.postService.commentStatus(this.checked, this.postID, this.postCreatorId);
  }

  commentDelete(id: string, creator_id: string) {
    if (this.userID === creator_id) {
      this.commentService.deleteComment(id, creator_id);
    } else {
      this.dialog.open(ErrorComponent, {
        data: {
          message: "You're not authorized to delete this comment."
        }
      });
    }
  }

  toggleSubComments(id: string) {
    this.toggleReply = true;
    this.replyUserId = id;
  }

  hideSubComponent(data: { status: boolean }) {
    this.toggleReply = data.status;
  }

  ngOnDestroy() {
    this.commentSubs.unsubscribe();
  }
}
