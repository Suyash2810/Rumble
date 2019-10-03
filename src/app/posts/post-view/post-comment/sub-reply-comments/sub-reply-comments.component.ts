import { Component, OnInit, ViewChild, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sub-reply-comments',
  templateUrl: './sub-reply-comments.component.html',
  styleUrls: ['./sub-reply-comments.component.css']
})
export class SubReplyCommentsComponent implements OnInit, OnDestroy {

  comment: string = " ";
  @ViewChild('f') subform: NgForm;
  @Output() toggler = new EventEmitter<{ status: boolean }>();
  @Input() parentId: string = " ";
  @Input() postId: string = " ";
  userInfo: User;
  userSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserInfo();
    this.userInfo = this.authService.getStaticUserInfo();
    this.userSub = this.authService.getUserInfoListener().subscribe(
      (user: User) => {
        this.userInfo = user;
      }
    );
  }

  onSubmit() {
    this.comment = this.subform.value.comment;
  }

  closeSubComponent() {
    let toggleData = { status: false };
    this.toggler.emit(toggleData);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
