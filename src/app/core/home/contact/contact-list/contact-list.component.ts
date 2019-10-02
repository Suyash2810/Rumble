import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

  contacts: Array<Contact> = [];
  contactsSub: Subscription;
  contact: Contact;
  userId: string = " ";
  toggle: boolean = false;
  tag: string = " ";
  contactSub: Subscription;
  isLoading: boolean = true;

  constructor(private contactService: ContactService, private authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.getCurrentUserId();

    this.contactService.getContactMessages();
    this.contacts = this.contactService.getContacts();
    this.contactsSub = this.contactService.getContactsListener().subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this.contactsSub.unsubscribe();
    if (this.contactSub) {
      this.contactSub.unsubscribe();
    }
  }

  onToggle() {
    this.toggle = !this.toggle;
  }

  deleteMessage(id: string) {
    this.contactService.deleteContactMessage(id);
  }

  openModal(id: string) {
    this.contactService.getContactById(id);
    this.contact = this.contactService.getContactByIdStatic();
    this.contactSub = this.contactService.getContactByIdListener().subscribe(
      (contact: Contact) => {
        this.contact = contact;
        document.getElementById('username').innerText = contact.username;
        document.getElementById('email_span').innerText = contact.email;
        document.getElementById('subject_span').innerText = contact.subject;
        document.getElementById('phone_span').innerText = contact.phone;
        document.getElementById('tag_span').innerText = contact.tag;
        document.getElementById('createdAt_span').innerText = contact.createdAt;
        document.getElementById('content_span').innerText = contact.content;
      }
    );
  }
}
