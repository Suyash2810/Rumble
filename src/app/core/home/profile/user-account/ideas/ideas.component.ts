import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.css']
})
export class IdeasComponent implements OnInit {

  colors: Array<{ key: string, value: string }> = [
    {
      key: 'Caribbean Green',
      value: '#00BFA5'
    },
    {
      key: 'Vivid Cyan',
      value: '#00B8D4'
    },
    {
      key: 'Dodger Blue',
      value: '#0091EA'
    },
    {
      key: 'Mosqe',
      value: '#006064'
    },
    {
      key: 'Limeade',
      value: '#01579B'
    },
    {
      key: 'Medium Turquoise',
      value: '#4DD0E1'
    },
    {
      key: 'Cobalt',
      value: '#0D47A1'
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
