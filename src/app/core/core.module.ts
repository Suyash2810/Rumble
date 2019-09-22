import { AppRoutingModule } from "../app-routing.module";
import { SharedModule } from "../shared/shared.module";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../material.module";
import { BasicComponent } from './home/basic/basic.component';
import { ProfileComponent } from './home/profile/profile.component';
import { ContactComponent } from './home/contact/contact.component';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent,
        BasicComponent,
        ProfileComponent,
        ContactComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule,
        MaterialModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent
    ]
})

export class CoreModule {

}