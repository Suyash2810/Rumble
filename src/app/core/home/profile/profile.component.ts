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

  constructor(private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit() {

    this.authService.getUserInfo().subscribe(
      (data: { status: string, user: any }) => {
        this.username = data.user.username;
        this.email = data.user.email;
        this.imagePath = data.user.imagePath
        console.log(data);
      },
      (error) => {
        this.dialog.open(ErrorComponent, {
          data: {
            message: error.error.error.message
          }
        });
      }
    )
  }

}
