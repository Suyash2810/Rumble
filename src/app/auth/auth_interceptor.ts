import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(private authServcie: AuthService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        const token = this.authServcie.getToken();
        if (!token) {
            return next.handle(request);
        }

        const authRequest = request.clone({
            headers: request.headers.set('authaccess', token)
        });

        return next.handle(authRequest);
    }
}