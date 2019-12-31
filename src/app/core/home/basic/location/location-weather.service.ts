import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { location } from "./location.model";
import { weather } from "./weather-data.model";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class WeatherService {

    coordinates: location;
    weatherData: weather;
    weatherDataListener = new Subject<weather>();

    constructor(private httpClient: HttpClient) {

    }

    setCoordinates(coords: location) {
        this.coordinates = coords;
    }

    getWeatherData() {

        let url: string = `http://api.openweathermap.org/data/2.5/weather?APPID=6b33a9cd02a2019da57119c5157a083f&lat=${this.coordinates.latitude}&lon=${this.coordinates.longitude}`;
        this.httpClient.get<any>(url)
            .pipe(
                map(
                    (data) => {
                        return {
                            description: data.weather[0].description,
                            curr_temp: data.main.temp,
                            max_temp: data.main.temp_max,
                            min_temp: data.main.temp_min,
                            feels_like: data.main.feels_like,
                            pressure: data.main.pressure,
                            humidity: data.main.humidity,
                            visibility: data.visibility,
                            wind: data.wind.speed,
                            place: data.name ? data.name : data.sys.country
                        }
                    }
                )
            )
            .subscribe(
                (weatherForcast: weather) => {
                    this.weatherData = weatherForcast;
                    this.weatherDataListener.next(this.weatherData);
                }
            )
    }

    recieveWeatherData() {
        return this.weatherDataListener.asObservable();
    }

}