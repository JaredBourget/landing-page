import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { chain, groupBy } from 'lodash';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  fahrenheit: boolean = true;

  expanded: number = 0;

  forecastData: any = [];

  constructor(
    public weather: WeatherService,
  ) {
    weather.getForecast().subscribe((forecast) => {
      this.forecastData = chain(forecast)
        .groupBy('day')
        .map((value, key) => ({ day: key, weather: value, high: 0, low: 0 }))
        .value()
      this.forecastData.forEach((cast: any) => {
        cast.weather.forEach((day: any, index: number) => {
          if (index === 0) {
            cast.high = day.main.temp_max;
            cast.low = day.main.temp_min;
          }
          if (day.main.temp_max > cast.high) {
            cast.high = day.main.temp_max;
          }
          if (day.main.temp_min < cast.low) {
            cast.low = day.main.temp_min;
          }
        })
      })
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

  expandCard(index: number) {
    this.expanded = index;
  }

  toggleUnit() {
    this.fahrenheit = !this.fahrenheit;
  }

}
