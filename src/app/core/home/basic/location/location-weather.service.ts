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

    getWeatherData(geoData: {lat: number, long: number}) {

        let url: string = `http://api.openweathermap.org/data/2.5/weather?APPID=6b33a9cd02a2019da57119c5157a083f&lat=${geoData.lat}&lon=${geoData.long}`;
        this.httpClient.get<any>(url)
            .subscribe(
                (response) => {
                    console.log(response);
                }
            )
    }
}