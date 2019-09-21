import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUserModel, AuthUser } from "./authUser.model";
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../error/error.component';

@Injectable({ providedIn: 'root' })

export class AuthService {

    private token: string;
    private authenticatedListener = new Subject<boolean>();
    private userId: string;
    private username: string;
    isAuthenticated: boolean = false;
    tokenTimer: any;

    constructor(private http: HttpClient, public dialog: MatDialog) { }

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

    getCurrentUsername() {
        return this.username;
    }

    createUser(username: string, email: string, password: string) {

        type responseType = { status: string, user: any };
        let data: AuthUser = new AuthUserModel(username, email, password);

        return this.http.post<responseType>('http://localhost:3000/user', data);
    }

    loginUser(email: string, password: string) {
        type responseType = { success: string, user: any, token: string, expiresIn: number, creator_id: string };

        let body = {
            email, password
        };

        this.http.post<responseType>('http://localhost:3000/auth/login', body)
            .subscribe(
                (data) => {
                    const token = data.token;
                    this.token = token;
                    const expiresIn = data.expiresIn;
                    this.userId = data.creator_id;
                    this.username = data.user.username;

                    if (token) {
                        this.setAuthTimer(expiresIn);
                        const timeNow = new Date();
                        const expiryTime = new Date(timeNow.getTime() + expiresIn * 1000);
                        this.setAuthData(token, expiryTime, data.creator_id, data.user.username);

                        this.isAuthenticated = true;
                        this.authenticatedListener.next(true);
                    }
                },
                error => {
                    const errorMessage = error.error.status;
                    this.dialog.open(ErrorComponent, {
                        data: {
                            message: errorMessage
                        }
                    });
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
                this.username = dataFromStorage.username;

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
        this.dialog.open(ErrorComponent, {
            data: {
                message: "You have been logged out."
            }
        })
    }

    private setAuthData(token: string, expiresIn: Date, currentUserId: string, username: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiresIn', expiresIn.toISOString());
        localStorage.setItem('userId', currentUserId);
        localStorage.setItem('username', username);
    }

    private removeAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiresIn');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expiresIn = localStorage.getItem('expiresIn');
        const userId = localStorage.getItem('userId');
        const username = localStorage.getItem('username');

        if (!token || !expiresIn) {
            return;
        }

        return {
            token: token,
            expiresIn: new Date(expiresIn),
            userId: userId,
            username: username
        }
    }
}