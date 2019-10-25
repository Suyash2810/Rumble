import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.css']
})
export class ChangeInfoComponent implements OnInit {

  username: string = " ";
  email: string = " ";
  pass: string = " ";
  confPass: string = " ";
  userInfoSub: Subscription;
  userInfo: User;
  isLoading: boolean = true;
  @ViewChild('f') form: NgForm;

  constructor(private authService: AuthService) { }

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
    console.log(this.form);
  }

}
