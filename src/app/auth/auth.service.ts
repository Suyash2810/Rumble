import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUserModel, AuthUser } from "./authUser.model";
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuthService {

    private token: string;
    private authenticatedListener = new Subject<boolean>();
    isAuthenticated: boolean = false;
    tokenTimer: any;

    constructor(private http: HttpClient) { }

    getToken() {
        return this.token;
    }

    getAuthenticatedListener() {
        return this.authenticatedListener.asObservable();
    }

    getAuth() {
        return this.isAuthenticated;
    }

    createUser(username: string, email: string, password: string) {

        type responseType = { success: string, user: any };
        let data: AuthUser = new AuthUserModel(username, email, password);

        return this.http.post<responseType>('http://localhost:3000/user', data);
    }

    loginUser(email: string, password: string) {
        type responseType = { success: string, user: any, token: string, expiresIn: number };

        let body = {
            email, password
        };

        return this.http.post<responseType>('http://localhost:3000/auth/login', body)
            .subscribe(
                (data) => {
                    const token = data.token;
                    this.token = token;
                    console.log(data);
                    if (token) {
                        const expiresIn = data.expiresIn;

                        this.tokenTimer = setTimeout(
                            () => {
                                this.logoutUser();
                            },
                            expiresIn * 1000
                        )
                        this.isAuthenticated = true;
                        this.authenticatedListener.next(true);
                    }
                }
            )
    }

    logoutUser() {
        this.token = null;
        this.isAuthenticated = false;
        this.authenticatedListener.next(false);
        clearTimeout(this.tokenTimer);
    }
}