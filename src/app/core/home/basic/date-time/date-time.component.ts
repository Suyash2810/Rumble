import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css']
})
export class DateTimeComponent implements OnInit {

  date: Date;

  constructor() {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  ngOnInit() {
  }

}
