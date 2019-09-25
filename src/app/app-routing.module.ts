import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostEditComponent } from "./posts/post-edit/post-edit.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";
import { PostViewComponent } from "./posts/post-view/post-view.component";
import { HomeComponent } from "./core/home/home.component";
import { BasicComponent } from "./core/home/basic/basic.component";
import { ProfileComponent } from "./core/home/profile/profile.component";
import { ContactComponent } from "./core/home/contact/contact.component";
import { UserProfileComponent } from './core/home/profile/user-profile/user-profile.component';
import { UserAccountComponent } from "./core/home/profile/user-account/user-account.component";
import { UserPostsComponent } from "./core/home/profile/user-posts/user-posts.component";

const appRoutes: Routes = [
    {
        path: '', component: HomeComponent, children: [
            { path: '', component: BasicComponent },
            {
                path: 'profile', component: ProfileComponent, children: [
                    { path: 'user-profile', component: UserProfileComponent },
                    { path: 'user-account', component: UserAccountComponent },
                    { path: 'user-posts', component: UserPostsComponent }
                ]
            },
            { path: 'contact', component: ContactComponent }
        ]
    },
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