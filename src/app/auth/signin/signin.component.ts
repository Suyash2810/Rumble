import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  email: string;
  password: string;
  @ViewChild('f') form: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }

  onSubmit() {
    this.email = this.form.value.email;
    this.password = this.form.value.password;

    this.authService.loginUser(this.email, this.password);
  }

}
