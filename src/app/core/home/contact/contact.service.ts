import { Injectable } from "@angular/core";
import { Contact, ContactModel } from "./contact.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { MatDialog } from "@angular/material";
import { ErrorComponent } from "src/app/error/error.component";

@Injectable({ providedIn: "root" })

export class ContactService {

    private contact: Contact;
    private contactListener = new Subject<Contact>();
    private contacts: Array<Contact>;
    private contactsListener = new Subject<Array<Contact>>();

    constructor(private httpClient: HttpClient, private dialog: MatDialog) { }

    addContact(usernmae: string, email: string, phone: string, content: string, creator_id: string) {

        let data = new ContactModel(usernmae, email, phone, content, creator_id);
        type responseType = { status: string, contact: any };

        this.httpClient.post<responseType>("http://localhost:3000/contact", data)
            .pipe(
                map(
                    (data) => {
                        return {
                            id: data.contact._id,
                            username: data.contact.username,
                            email: data.contact.email,
                            phone: data.contact.phone,
                            content: data.contact.content,
                            creator_id: data.contact.creator_id
                        }
                    }
                )
            )
            .subscribe(
                (transformedContact) => {
                    console.log(transformedContact);
                    this.contact = transformedContact;
                    this.contactListener.next(this.contact);
                },
                (error) => {
                    this.dialog.open(ErrorComponent, {
                        data: {
                            message: error.error.error.message
                        }
                    });
                }
            )
    }

    getContactMessages() {

        type responseType = { status: string, contacts: any };

        this.httpClient.get<responseType>("http://localhost:3000/contacts")
            .pipe(
                map(
                    (data) => {
                        return data.contacts.map(
                            (contact) => {
                                return {
                                    id: contact._id,
                                    username: contact.username,
                                    email: contact.email,
                                    phone: contact.phone,
                                    content: contact.content,
                                    creator_id: contact.creator_id
                                }
                            }
                        )
                    }
                )
            ).subscribe(
                (transformedContacts) => {
                    console.log(transformedContacts);
                    this.contacts = transformedContacts;
                    this.contactsListener.next([...this.contacts]);
                }
            )
    }

    getContacts() {
        return this.contacts;
    }

    getContactsListener() {
        return this.contactsListener.asObservable();
    }
}