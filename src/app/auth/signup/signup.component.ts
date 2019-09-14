import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user.model';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from 'src/app/error/error.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email: string;
  password: string;
  username: string;
  errMsg: string;

  @ViewChild('f') form: NgForm;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {

  }

  onSubmit() {
    this.email = this.form.value.email;
    this.password = this.form.value.password;
    this.username = this.form.value.username;

    this.authService.createUser(this.username, this.email, this.password).subscribe(
      result => {
        console.log(result.user);
        this.router.navigate(['../login'], { relativeTo: this.route });
      },
      error => {
        if (error.error.error.message) {
          this.errMsg = error.error.error.message;
        } else {
          if (error.error.error.code == 11000) {
            this.errMsg = "This email has already been registered.";
          }
        }
        this.dialog.open(ErrorComponent);
        console.log(this.errMsg);
        this.form.reset();
      }
    );
  }
}