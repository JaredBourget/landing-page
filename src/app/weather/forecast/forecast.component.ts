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

  expanded: any = null;

  forecastData: any = [];

  constructor(
    public weather: WeatherService,
  ) {
    weather.getForecast().subscribe((forecast) => {
      // grouping forecast by day
      this.forecastData = chain(forecast)
        .groupBy('day')
        .map((value, key) => ({ day: key, weather: value, high: 0, low: 0 }))
        .value()
      this.forecastData.forEach((cast: any) => {
        // setting a high and low temp for each day (3 hr intervals)
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

  calculateC(temp: number) {
    return ((temp - 32)*5)/9;
  }

  expandCard(index: number) {
    this.expanded = this.expanded === index ? null : index;
  }

  toggleUnit() {
    this.fahrenheit = !this.fahrenheit;
  }

}
