import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  imagePreview: string;
  file: File;
  userId: string;
  imagePath: string;
  userSub: Subscription;

  @ViewChild('f') form: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.getCurrentUserId();
    this.authService.getUserInfo();
    this.userSub = this.authService.getUserInfoListener().subscribe(
      (data: User) => {
        this.imagePath = data.imagePath;
      }
    )
  }

  onSubmit() {
    this.authService.updateUserImage(this.userId, this.form.value.image);
  }

  imageUpload(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
    this.form.value.image = this.file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = (reader.result as string);
    }

    reader.readAsDataURL(this.file);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
