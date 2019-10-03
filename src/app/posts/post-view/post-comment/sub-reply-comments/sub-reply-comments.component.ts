import { Component, OnInit, ViewChild, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/auth/user.model';
import { Subscription } from 'rxjs';
import { ReplyService } from './reply.service';
import { Reply } from './reply.model';

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

  constructor(private replyService: ReplyService) { }

  ngOnInit() {

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

  }
}
