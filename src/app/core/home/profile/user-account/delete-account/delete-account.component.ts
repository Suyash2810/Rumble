import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.form);
  }

}
