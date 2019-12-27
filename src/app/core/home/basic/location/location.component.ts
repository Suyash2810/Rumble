import { Component, OnInit } from '@angular/core';
import { WeatherService } from './location-weather.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  geoData: any;
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.geoData = position.coords;
          console.log(this.geoData);
          // this.weatherService.getWeatherData(this.geoData);
          console.log(position);
        }
      )
    }
    else {
      console.log("Geolocation not enabled.");
    }
  }

}
