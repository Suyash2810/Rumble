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
import { ContactListComponent } from './home/contact/contact-list/contact-list.component';
import { FavoriteComponent } from './home/profile/user-account/favorite/favorite.component';
import { IdeasComponent } from './home/profile/user-account/ideas/ideas.component';
import { DeleteAccountComponent } from './home/profile/user-account/delete-account/delete-account.component';
import { ChangeInfoComponent } from './home/profile/user-account/change-info/change-info.component';
import { DateTimeComponent } from './home/basic/date-time/date-time.component';
import { LocationComponent } from './home/basic/location/location.component';

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
        ContactFormComponent,
        ContactListComponent,
        FavoriteComponent,
        IdeasComponent,
        DeleteAccountComponent,
        ChangeInfoComponent,
        DateTimeComponent,
        LocationComponent
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