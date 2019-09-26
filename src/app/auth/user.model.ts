export interface User {
    id: string,
    username: string,
    email: string,
    imagePath: string
}

export class UserModel implements User {

    email: string;
    id: string;
    username: string;
    imagePath: string;

    constructor(id: string, username: string, email: string, imagePath: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.imagePath = imagePath;
    }
}