import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class AuthService {

    constructor(private http: HttpClient) { }

    createUser(username: string, email: string, password: string) {

        type responseType = { success: string, user: any };
        let data = {
            username, email, password
        }
        return this.http.post<responseType>('http://localhost:3000/user', data);
    }
}