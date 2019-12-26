import { Component, OnInit } from '@angular/core';
import { WeatherService } from './location-weather.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {

    this.weatherService.getWeatherData();

  }

}
