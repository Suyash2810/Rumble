export interface weather {

    description: string;
    curr_temp: number;
    max_temp: number;
    min_temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    visibility: number;
    wind: number;
    place: string;
}

export class WeatherData implements weather {

    description: string;
    curr_temp: number;
    max_temp: number;
    min_temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    visibility: number;
    wind: number;
    place: string;

    constructor(
        description: string,
        curr_temp: number,
        max_temp: number,
        min_temp: number,
        feels_like: number,
        pressure: number,
        humidity: number,
        visibility: number,
        wind: number,
        place: string) {
        this.description = description;
        this.curr_temp = curr_temp;
        this.max_temp = max_temp;
        this.min_temp = min_temp;
        this.feels_like = feels_like;
        this.pressure = pressure;
        this.humidity = humidity;
        this.visibility = visibility;
        this.wind = wind;
        this.place = place;
    }
}