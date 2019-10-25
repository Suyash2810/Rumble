import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from 'src/app/error/error.component';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  @ViewChild('f') form: NgForm;
  pass: string = " ";
  cpass: string = " ";
  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.value.conf1 == true && this.form.value.conf2 == true) {
      this.pass = this.form.value.password;
      this.cpass = this.form.value.confirmPass;
      if (this.pass === this.cpass) {
        this.authService.deleteUserAccount().subscribe(
          (result) => {
            console.log(result);
            this.router.navigate(['/', 'login'], { relativeTo: this.route });
          }
        )
      } else {
        this.dialog.open(ErrorComponent, {
          data: {
            message: "The passwords do not match."
          }
        });
      }
    } else {
      this.dialog.open(ErrorComponent, {
        data: {
          message: "Please confirm both the options."
        }
      })
    }
  }

}
