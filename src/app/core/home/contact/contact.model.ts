export interface Contact {
    id: string;
    username: string;
    email: string;
    phone: string;
    content: string;
    creator_id: string;
    tag: string;
    subject: string;
    createdAt: string;
}

export class ContactModel implements Contact {
    id: string;
    username: string;
    email: string;
    phone: string;
    content: string;
    creator_id: string;
    tag: string;
    subject: string;
    createdAt: string;

    constructor(username: string, email: string, phone: string, content: string, creator_id: string, tag: string, subject: string) {
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.content = content;
        this.creator_id = creator_id;
        this.tag = tag;
        this.subject = subject;
    }
}