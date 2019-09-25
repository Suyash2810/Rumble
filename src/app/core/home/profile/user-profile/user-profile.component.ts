import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  imagePreview: any;
  @ViewChild('f') form: NgForm;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {

  }
}
