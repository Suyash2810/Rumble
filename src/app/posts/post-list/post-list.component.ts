import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Array<{ title: String, content: String }> = [
    {title:"JavScript", content:"Content is great."},
    {title:"JavScript", content:"Content is great."},
    {title:"JavScript", content:"Content is great."},
    {title:"JavScript", content:"Content is great."}
  ];

  constructor() { }

  ngOnInit() {
  }

}
