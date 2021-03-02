import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  fahrenheit: boolean = true;

  forecastData: any = [];

  constructor(
    public weather: WeatherService,
  ) {
   weather.getForecast().subscribe((forecast) => {
     console.log(forecast)
     this.forecastData = forecast;
   })
  }

  ngOnInit(): void {
  }

  getImageSrc(icon: string) {
    return `http://openweathermap.org/img/w/${icon}.png`
  }

  calculateC(temp: number) {
    return ((temp - 32)*5)/9;
  }

  toggleUnit() {
    this.fahrenheit = !this.fahrenheit;
  }

}
