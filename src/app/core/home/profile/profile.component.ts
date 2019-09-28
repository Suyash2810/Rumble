import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from 'src/app/error/error.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: string = " ";
  email: string = " ";
  imagePath: string = " ";
  userInfo: User;

  constructor(private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit() {

    this.authService.getUserInfo();
    this.userInfo = this.authService.getStaticUserInfo();

    this.authService.getUserInfoListener().subscribe(
      (user) => {
        this.username = user.username;
        this.email = user.email;
        this.imagePath = user.imagePath;
      }
    )
  }

}
