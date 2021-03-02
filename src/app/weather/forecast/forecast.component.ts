import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  constructor(
    public weather: WeatherService,
  ) {
   weather.getForecast().subscribe((coords) => {
     console.log(coords)
   })
  }

  ngOnInit(): void {
  }

}
