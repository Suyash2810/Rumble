import { NgModule } from "@angular/core";
import { SignupComponent } from "./signup/signup.component";
import { SigninComponent } from "./signin/signin.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        RouterModule
    ]
})

export class AuthModule {

}