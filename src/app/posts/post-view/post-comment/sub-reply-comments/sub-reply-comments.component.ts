import { Component, OnInit, ViewChild, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ReplyService } from './reply.service';
import { Reply } from './reply.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sub-reply-comments',
  templateUrl: './sub-reply-comments.component.html',
  styleUrls: ['./sub-reply-comments.component.css']
})
export class SubReplyCommentsComponent implements OnInit, OnDestroy {

  reply: string = " ";
  @ViewChild('f') subform: NgForm;
  @Output() toggler = new EventEmitter<{ status: boolean }>();
  @Input() parentId: string = " ";
  @Input() postId: string = " ";
  replies: Array<Reply> = [];
  replySub: Subscription;
  isAuth: boolean = false;
  authSub: Subscription;

  constructor(private replyService: ReplyService, private authService: AuthService) { }

  ngOnInit() {
    this.replyService.getSpecificReplies(this.postId, this.parentId);
    this.replies = this.replyService.getReplies();
    this.replySub = this.replyService.getRepliesListener().subscribe(
      (replies: Reply[]) => {
        this.replies = replies;
        console.log(this.replies);
      }
    );
    this.isAuth = this.authService.getAuth();
    this.authSub = this.authService.getAuthenticatedListener().subscribe(
      (isAuth: boolean) => {
        this.isAuth = isAuth;
      }
    )
  }

  onSubmit() {
    this.reply = this.subform.value.comment;
    this.replyService.addReply(this.reply, this.postId, this.parentId);
    this.subform.reset();
  }

  closeSubComponent() {
    let toggleData = { status: false };
    this.toggler.emit(toggleData);
  }

  ngOnDestroy() {
    this.replySub.unsubscribe();
  }
}
