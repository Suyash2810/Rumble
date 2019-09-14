import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUserModel, AuthUser } from "./authUser.model";
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuthService {

    private token: string;
    private authenticatedListener = new Subject<boolean>();
    private userId: string;
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

    getCurrentUserId() {
        return this.userId;
    }

    createUser(username: string, email: string, password: string) {

        type responseType = { status: string, user: any };
        let data: AuthUser = new AuthUserModel(username, email, password);

        this.http.post<responseType>('http://localhost:3000/user', data).subscribe(
            result => {
                console.log(result);
            },
            error => {
                console.log("There was some error that was encountered.", error);
            }
        )
    }

    loginUser(email: string, password: string) {
        type responseType = { success: string, user: any, token: string, expiresIn: number, creator_id: string };

        let body = {
            email, password
        };

        return this.http.post<responseType>('http://localhost:3000/auth/login', body)
            .subscribe(
                (data) => {
                    const token = data.token;
                    this.token = token;
                    const expiresIn = data.expiresIn;
                    this.userId = data.creator_id;

                    if (token) {
                        this.setAuthTimer(expiresIn);
                        const timeNow = new Date();
                        const expiryTime = new Date(timeNow.getTime() + expiresIn * 1000);
                        this.setAuthData(token, expiryTime, data.creator_id);

                        this.isAuthenticated = true;
                        this.authenticatedListener.next(true);
                    }
                },
                error => {
                    console.log(error);
                }
            )
    }

    autoUpdateAuthUser() {
        const dataFromStorage = this.getAuthData();
        if (dataFromStorage) {
            const nowTime = new Date();
            const validTime = dataFromStorage.expiresIn.getTime() - nowTime.getDate();
            if (validTime > 0) {
                this.token = dataFromStorage.token;
                this.isAuthenticated = true;
                this.userId = dataFromStorage.userId;

                this.setAuthTimer(validTime / 1000);
                this.authenticatedListener.next(true);
            }
        } else {
            return;
        }
    }

    setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(
            () => {
                this.logoutUser();
            },
            duration * 1000
        );
    }

    logoutUser() {
        this.token = null;
        this.isAuthenticated = false;
        this.authenticatedListener.next(false);
        this.userId = null;
        clearTimeout(this.tokenTimer);
        this.removeAuthData();
    }

    private setAuthData(token: string, expiresIn: Date, currentUserId: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiresIn', expiresIn.toISOString());
        localStorage.setItem('userId', currentUserId);
    }

    private removeAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiresIn');
        localStorage.removeItem('userId');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expiresIn = localStorage.getItem('expiresIn');
        const userId = localStorage.getItem('userId');

        if (!token || !expiresIn) {
            return;
        }

        return {
            token: token,
            expiresIn: new Date(expiresIn),
            userId: userId
        }
    }
}