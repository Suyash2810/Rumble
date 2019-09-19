import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostEditComponent } from "./posts/post-edit/post-edit.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";
import { PostViewComponent } from "./posts/post-view/post-view.component";
import { HomeComponent } from "./home/home.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'list', component: PostListComponent },
    { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
    { path: 'edit/:postID', component: PostEditComponent, canActivate: [AuthGuard] },
    { path: 'view/:postID', component: PostViewComponent },
    { path: 'login', component: SigninComponent },
    { path: 'register', component: SignupComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [AuthGuard]
})

export class AppRoutingModule {

}