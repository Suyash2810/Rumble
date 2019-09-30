import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

  contacts: Array<Contact> = [];
  contactsSub: Subscription;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getContactMessages();
    this.contacts = this.contactService.getContacts();
    this.contactsSub = this.contactService.getContactsListener().subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
  }

  ngOnDestroy() {
    this.contactsSub.unsubscribe();
  }
}
