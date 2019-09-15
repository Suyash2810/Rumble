import { NgModule } from "@angular/core";
import { PostCreateComponent } from "./post-create/post-create.component";
import { PostEditComponent } from "./post-edit/post-edit.component";
import { PostListComponent } from "./post-list/post-list.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";

@NgModule({
    declarations: [
        PostCreateComponent,
        PostEditComponent,
        PostListComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MaterialModule
    ]
})

export class PostsModule {

}