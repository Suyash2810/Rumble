import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  username: string = " ";

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.username = this.authService.getCurrentUsername();
  }

}
