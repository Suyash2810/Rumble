import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  authenticated: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.authenticated = this.authService.getAuth();
    this.authService.getAuthenticatedListener().subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    )
  }
}
