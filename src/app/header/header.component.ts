import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  loggedIn: boolean = false;
  authenticatedSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authenticatedSubscription = this.authService.getAuthenticatedListener().subscribe(
      (logged) => {
        if (logged) {
          this.loggedIn = true;
        }
      }
    )
  }

  logout() {
    this.authService.logoutUser();
    this.loggedIn = this.authService.getAuth();
    console.log(this.loggedIn);
    this.authenticatedSubscription = this.authService.getAuthenticatedListener().subscribe(
      (logged) => {
        if (!logged) {
          this.loggedIn = false;
        }
      }
    )
  }

  ngOnDestroy() {
    this.authenticatedSubscription.unsubscribe();
  }
}
