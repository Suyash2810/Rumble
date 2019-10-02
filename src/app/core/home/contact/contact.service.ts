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

    addContact(username: string, email: string, phone: string, content: string, creator_id: string, tag: string, subject: string) {

        let data = new ContactModel(username, email, phone, content, creator_id, tag, subject);
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
                            creator_id: data.contact.creator_id,
                            tag: data.contact.tag,
                            subject: data.contact.subject,
                            createdAt: data.contact.createdAt
                        }
                    }
                )
            )
            .subscribe(
                (transformedContact) => {
                    console.log(transformedContact);
                    this.contacts.push(transformedContact);
                    this.contactsListener.next([...this.contacts]);
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
                                    creator_id: contact.creator_id,
                                    tag: contact.tag,
                                    subject: contact.subject,
                                    createdAt: contact.createdAt
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

    deleteContactMessage(id: string) {

        type responseType = { status: string, contact: any };

        this.httpClient.delete<responseType>("http://localhost:3000/contact/" + id)
            .pipe(
                map(
                    (data) => {
                        return {
                            id: data.contact._id,
                            username: data.contact.username,
                            email: data.contact.email,
                            phone: data.contact.phone,
                            content: data.contact.content,
                            creator_id: data.contact.creator_id,
                            tag: data.contact.tag,
                            subject: data.contact.subject,
                            createdAt: data.contact.createdAt
                        }
                    }
                )
            )
            .subscribe(
                (transformedContact: Contact) => {
                    console.log(transformedContact);
                    this.contacts = this.contacts.filter(contact => contact.id != id);
                    this.contactsListener.next([...this.contacts]);
                },
                (error) => {
                    this.dialog.open(ErrorComponent, {
                        data: {
                            message: "The contact message could not be deleted."
                        }
                    });
                }
            );
    }

    getContactById(id: string) {

        type responseType = { status: string, contact: any };
        this.httpClient.get<responseType>("http://localhost:3000/contact/" + id)
            .pipe(
                map(
                    (data) => {
                        return {
                            id: data.contact._id,
                            username: data.contact.username,
                            email: data.contact.email,
                            phone: data.contact.phone,
                            content: data.contact.content,
                            creator_id: data.contact.creator_id,
                            tag: data.contact.tag,
                            subject: data.contact.subject,
                            createdAt: data.contact.createdAt
                        }
                    }
                )
            )
            .subscribe(
                (transformedContact: Contact) => {
                    this.contact = transformedContact;
                    this.contactListener.next(this.contact);
                },
                (error) => {
                    this.dialog.open(ErrorComponent, {
                        data: {
                            message: "The contact could not be fetched."
                        }
                    });
                }
            );
    }
}