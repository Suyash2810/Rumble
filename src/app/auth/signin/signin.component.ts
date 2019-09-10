import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  email: string;
  password: string;
  @ViewChild('f') form: NgForm;

  constructor() { }

  ngOnInit() {

  }

  onSubmit() {
    this.email = this.form.value.email;
    this.password = this.form.value.password;
  }

}
