import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';
import { User } from '../user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email: string;
  password: string;
  username: string;
  user: User;

  @ViewChild('f') form: NgForm;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

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
            userData: {
              id: data.user._id,
              username: data.user.username,
              email: data.user.email
            },
            status: data.status
          }
        }
      )
    )
      .subscribe(
        (transformedUserData) => {
          this.user = transformedUserData.userData;
          console.log(this.user, transformedUserData.status);
        }
      );

    this.router.navigate(['../login'], { relativeTo: this.route });
  }
}
