import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  loggedIn: boolean = false;
  authenticatedSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

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
    );

    this.router.navigate(['/'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.authenticatedSubscription.unsubscribe();
  }
}
