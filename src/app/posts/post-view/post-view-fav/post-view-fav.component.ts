import { Component, OnInit } from '@angular/core';
import { ViewFavService } from './post-view-fav.service';

@Component({
  selector: 'app-post-view-fav',
  templateUrl: './post-view-fav.component.html',
  styleUrls: ['./post-view-fav.component.css']
})
export class PostViewFavComponent implements OnInit {

  constructor(private viewFavService: ViewFavService) { }

  ngOnInit() {

    this.viewFavService.getData();
  }

}
