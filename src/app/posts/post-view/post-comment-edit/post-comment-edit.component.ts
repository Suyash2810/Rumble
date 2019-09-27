import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CommentService } from '../post-comment/comment.service';
import { Comment } from '../post-comment/comment.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-comment-edit',
  templateUrl: './post-comment-edit.component.html',
  styleUrls: ['./post-comment-edit.component.css']
})
export class PostCommentEditComponent implements OnInit {

  comment: Comment;
  commentSub: Subscription;

  id: string = " ";

  constructor(private router: Router, private route: ActivatedRoute, private commentService: CommentService) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['commentID'];
        console.log(this.id);
      }
    );

    this.commentService.getCommentById(this.id);
    this.comment = this.commentService.getStaticComment();
    this.commentSub = this.commentService.getCommentListener().subscribe(
      (comment: Comment) => {
        this.comment = comment;
        console.log(this.comment);
      }
    )
  }

  navigate() {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }
}
