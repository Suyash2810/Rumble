export interface Contact {
    id: string;
    username: string;
    email: string;
    phone: string;
    content: string;
    creator_id: string;
}

export class ContactModel implements Contact {
    id: string;
    username: string;
    email: string;
    phone: string;
    content: string;
    creator_id: string;

    constructor(username: string, email: string, phone: string, content: string, creator_id: string) {
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.content = content;
        this.creator_id = creator_id;
    }
}