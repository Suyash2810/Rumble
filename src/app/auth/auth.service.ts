import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUserModel, AuthUser } from "./authUser.model";
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../error/error.component';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class AuthService {

    private token: string;
    private authenticatedListener = new Subject<boolean>();
    private userId: string;
    private username: string;
    isAuthenticated: boolean = false;
    tokenTimer: any;
    private userInfo: User;
    private userInfoListener = new Subject<User>();

    constructor(private http: HttpClient, public dialog: MatDialog, private router: Router) { }

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
            const validTime = dataFromStorage.expiresIn.getTime() - nowTime.getTime();
            if (validTime > 0) {
                this.token = dataFromStorage.token;
                this.isAuthenticated = true;
                this.userId = dataFromStorage.userId;
                this.username = dataFromStorage.username;
                console.log("The data is being fetched from the local storage", validTime / 1000);
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
                console.log("Called immediately");
                this.logoutUser();
            },
            duration * 1000
        );
        console.log(this.tokenTimer);
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
        });
        this.router.navigate(['/', 'login']);
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

    getUserInfo() {

        type responseType = { status: string, user: any };

        this.http.get<responseType>('http://localhost:3000/getUser')
            .pipe(
                map(
                    (data) => {
                        return {
                            id: data.user._id,
                            username: data.user.username,
                            email: data.user.email,
                            imagePath: data.user.imagePath
                        }
                    }
                )
            )
            .subscribe(
                (transformedUserData) => {
                    const user: User = transformedUserData;
                    this.userInfo = user;
                    this.userInfoListener.next(this.userInfo);
                },
                (error) => {
                    this.dialog.open(ErrorComponent, {
                        data: {
                            message: error.error.error.message
                        }
                    });
                }
            );
    }

    getStaticUserInfo() {
        return this.userInfo;
    }

    getUserInfoListener() {
        return this.userInfoListener.asObservable();
    }

    updateUserImage(id: string, image: File) {

        let formData = new FormData();
        formData.append('image', image);

        type responseType = { status: string, user: any };

        this.http.patch<responseType>("http://localhost:3000/updateUserImage/" + id, formData)
            .pipe(
                map(
                    (data) => {
                        return {
                            id: data.user._id,
                            username: data.user.username,
                            email: data.user.email,
                            imagePath: data.user.imagePath
                        }
                    }
                )
            )
            .subscribe(
                (transformedUserData) => {
                    console.log(transformedUserData);
                    this.getUserInfo();
                },
                (error) => {
                    this.dialog.open(ErrorComponent, {
                        data: {
                            message: "Please upload a valid Image."
                        }
                    })
                }
            )
    }

    updateUserInfo(username: string, email: string) {

        type responseType = { status: string, user: any };
        let data = {
            username,
            email
        };

        this.http.patch<responseType>("http://localhost:3000/updateUserInfo", data)
            .subscribe(
                (data) => {
                    console.log(data.status);
                    this.getUserInfo();
                }
            );
    }

    deleteUserAccount() {

        type responseType = { status: string, user: any };

        return this.http.delete<responseType>("http://localhost:3000/deleteUserAccount");
    }
}