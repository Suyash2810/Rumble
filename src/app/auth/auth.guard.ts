import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable()

export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const logged = this.authService.getAuth();

        if (!logged) {
            this.router.navigate(['/'], { relativeTo: this.route });
        }

        return logged;
    }
}