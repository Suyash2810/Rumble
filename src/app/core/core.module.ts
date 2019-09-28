import { AppRoutingModule } from "../app-routing.module";
import { SharedModule } from "../shared/shared.module";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../material.module";
import { BasicComponent } from './home/basic/basic.component';
import { ProfileComponent } from './home/profile/profile.component';
import { ContactComponent } from './home/contact/contact.component';
import { UserProfileComponent } from './home/profile/user-profile/user-profile.component';
import { UserAccountComponent } from './home/profile/user-account/user-account.component';
import { UserPostsComponent } from './home/profile/user-posts/user-posts.component';
import {FormsModule} from "@angular/forms";
import { ContactFormComponent } from './home/contact/contact-form/contact-form.component';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent,
        BasicComponent,
        ProfileComponent,
        ContactComponent,
        UserProfileComponent,
        UserAccountComponent,
        UserPostsComponent,
        ContactFormComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule,
        MaterialModule,
        FormsModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent
    ]
})

export class CoreModule {

}