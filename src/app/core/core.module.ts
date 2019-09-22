import { AppRoutingModule } from "../app-routing.module";
import { SharedModule } from "../shared/shared.module";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../material.module";
import { BasicComponent } from './home/basic/basic.component';
import { ProfileComponent } from './home/profile/profile.component';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent,
        BasicComponent,
        ProfileComponent
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