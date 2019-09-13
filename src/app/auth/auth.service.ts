import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUserModel, AuthUser } from "./authUser.model";
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuthService {

    private token: string;
    private authenticatedListener = new Subject<boolean>();
    private currentUserId: string;
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
        return this.currentUserId;
    }

    createUser(username: string, email: string, password: string) {

        type responseType = { success: string, user: any };
        let data: AuthUser = new AuthUserModel(username, email, password);

        return this.http.post<responseType>('http://localhost:3000/user', data);
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
                    console.log(data.creator_id);
                    this.currentUserId = data.creator_id;

                    if (token) {
                        this.setAuthTimer(expiresIn);
                        const timeNow = new Date();
                        const expiryTime = new Date(timeNow.getTime() + expiresIn * 1000);
                        this.setAuthData(token, expiryTime, this.currentUserId);

                        this.isAuthenticated = true;
                        this.authenticatedListener.next(true);
                    }
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
                this.currentUserId = dataFromStorage.userId;
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
        this.currentUserId = null;
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