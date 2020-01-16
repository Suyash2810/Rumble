import { NgModule } from "@angular/core";
import { PostCreateComponent } from "./post-create/post-create.component";
import { PostEditComponent } from "./post-edit/post-edit.component";
import { PostListComponent } from "./post-list/post-list.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";
import { PostViewComponent } from './post-view/post-view.component';
import { RichTextEditorAllModule } from "@syncfusion/ej2-angular-richtexteditor";
import { SharedModule } from "../shared/shared.module";
import { PostCommentComponent } from './post-view/post-comment/post-comment.component';
import { SubReplyCommentsComponent } from './post-view/post-comment/sub-reply-comments/sub-reply-comments.component';
import { PostCommentEditComponent } from './post-view/post-comment-edit/post-comment-edit.component';
import { PostViewFavComponent } from './post-view/post-view-fav/post-view-fav.component';

@NgModule({
    declarations: [
        PostCreateComponent,
        PostEditComponent,
        PostListComponent,
        PostViewComponent,
        PostCommentComponent,
        SubReplyCommentsComponent,
        PostCommentEditComponent,
        PostViewFavComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        MaterialModule,
        RichTextEditorAllModule,
        SharedModule
    ]
})

export class PostsModule {

}