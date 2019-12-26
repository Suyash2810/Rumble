import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { location } from "./location.model";
import { weather } from "./weather-data.model";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class WeatherService {

    coordinates: location;
    weatherData: weather;

    constructor(private httpClient: HttpClient) {

    }

    setCoordinates(coords: location) {

        this.coordinates.latitude = coords.latitude;
        this.coordinates.longitude = coords.longitude;
    }

    getWeatherData() {

        let url: string = `http://api.openweathermap.org/data/2.5/weather?APPID=yourapikey&lat=&lon=`;
        this.httpClient.get<any>(url)
            .subscribe(
                (response) => {
                    console.log(response);
                }
            )
    }
}