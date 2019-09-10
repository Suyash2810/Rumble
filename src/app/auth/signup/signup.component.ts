import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';
import { User } from '../user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email: string;
  password: string;
  username: string;

  @ViewChild('f') form: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  onSubmit() {
    this.email = this.form.value.email;
    this.password = this.form.value.password;
    this.username = this.form.value.username;

    this.authService.createUser(this.username, this.email, this.password).pipe(
      map(
        (data) => {
          return {
            id: data.user._id,
            username: data.user.username,
            email: data.user.email
          }
        }
      )
    )
      .subscribe(
        (transformedUserData) => {
          let user: User = transformedUserData;
          console.log(user);
        }
      )
  }
}
