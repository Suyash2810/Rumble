import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '../contact.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})

export class ContactFormComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm;
  username: string = " ";
  email: string = " ";
  phone: string = " ";
  content: string = " ";
  userId: string = " ";
  isAuth: boolean = false;
  isAuthSub: Subscription;

  constructor(private contactService: ContactService, private authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.getCurrentUserId();
    this.isAuth = this.authService.getAuth();
    this.isAuthSub = this.authService.getAuthenticatedListener().subscribe(
      (isAuth: boolean) => {
        this.isAuth = isAuth;
      }
    )
  }

  onSubmit() {
    this.username = this.form.value.username;
    this.email = this.form.value.email;
    this.phone = this.form.value.phone;
    this.content = this.form.value.content;
    if (!this.isAuth) {
      this.contactService.addContact(this.username, this.email, this.phone, this.content, null);
    } else {
      this.contactService.addContact(this.username, this.email, this.phone, this.content, this.userId);
    }
  }

  ngOnDestroy() {
    this.isAuthSub.unsubscribe();
  }
}
