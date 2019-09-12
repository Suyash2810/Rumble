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
                    const expiresIn = data.expiresIn;
                    if (token) {
                        this.tokenTimer = setTimeout(
                            () => {
                                this.logoutUser();
                            },
                            expiresIn * 1000
                        );
                        const timeNow = new Date();
                        const expiryTime = new Date(timeNow.getTime() + expiresIn * 1000);
                        this.setAuthData(token, expiryTime);

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
        this.removeAuthData();
    }

    private setAuthData(token: string, expiresIn: Date) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiresIn', expiresIn.toISOString());
    }

    private removeAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiresIn');
    }
}