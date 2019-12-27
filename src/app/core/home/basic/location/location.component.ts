import { Component, OnInit } from '@angular/core';
import { WeatherService } from './location-weather.service';
import { weather } from './weather-data.model';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from 'src/app/error/error.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  geoData: any;
  forecast: weather;
  isLoading: boolean = true;

  constructor(private weatherService: WeatherService, private dialog: MatDialog) { }

  ngOnInit() {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.geoData = position.coords;
          let data = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          this.weatherService.setCoordinates(data);
          this.weatherService.getWeatherData();
        }
      );

      this.weatherService.recieveWeatherData()
        .subscribe(
          (data) => {
            this.forecast = data;
            this.isLoading = false;
          }
        )
    }
    else {
      this.dialog.open(ErrorComponent, {
        data: {
          message: 'Geolocation is not supported in your browser.'
        }
      });
    }
  }

}
