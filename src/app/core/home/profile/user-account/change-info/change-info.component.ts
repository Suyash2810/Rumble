import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from 'src/app/error/error.component';

@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.css']
})
export class ChangeInfoComponent implements OnInit, OnDestroy {

  username: string = " ";
  email: string = " ";
  pass: string = " ";
  confPass: string = " ";
  userInfoSub: Subscription;
  userInfo: User;
  isLoading: boolean = true;
  @ViewChild('f') form: NgForm;

  constructor(private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit() {
    this.authService.getUserInfo();
    this.userInfo = this.authService.getStaticUserInfo();
    this.userInfoSub = this.authService.getUserInfoListener().subscribe(
      (user: User) => {
        this.userInfo = user;
        this.isLoading = false;
      }
    )
  }

  onSubmit() {
    this.username = this.form.value.username ? this.form.value.username : this.userInfo.username;
    this.email = this.form.value.email ? this.form.value.email : this.userInfo.email;
    this.pass = this.form.value.password;
    this.confPass = this.form.value.confirmPass;
    if (this.pass === this.confPass) {
      this.authService.updateUserInfo(this.username, this.email);
      this.form.reset();
    } else {
      this.dialog.open(ErrorComponent, {
        data: {
          message: "The passwords did not match. Please try again."
        }
      });
    }
  }

  ngOnDestroy() {
    this.userInfoSub.unsubscribe();
  }
}
