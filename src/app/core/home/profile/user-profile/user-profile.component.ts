import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  imagePreview: string;
  file: File;

  @ViewChild('f') form: NgForm;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {

  }

  imageUpload(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
    this.form.value.image = this.file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = (reader.result as string);
    }

    reader.readAsDataURL(this.file);
  }
}
