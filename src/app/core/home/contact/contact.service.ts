import { Injectable } from "@angular/core";
import { Contact, ContactModel } from "./contact.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })

export class ContactService {

    private contact: Contact;
    private contactListener = new Subject<Contact>();

    constructor(private httpClient: HttpClient) { }

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
                }
            )
    }
}