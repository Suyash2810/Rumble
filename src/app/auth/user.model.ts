export interface User {
    id: string,
    username: string,
    email: string
}

export class UserModel implements User {

    email: string;
    id: string;
    username: string;

    constructor(id: string, username: string, email: string) {
        this.id = id;
        this.username = username;
        this.email = email;
    }
}