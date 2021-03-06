import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap, mergeMap, pluck, filter, toArray } from 'rxjs/operators';
import { DateTime } from 'luxon';
import * as env from '../../../config.json';

interface Coords {
  lat: number,
  long: number
}


interface WeatherModel {
  city: {
    name: string,
    country: string
  },
  list: {
    main: {
      temp: number,
      temp_max: string,
​      temp_min: string
    },
    weather: {
      description: string,
      icon: string,
      main: string
    }[],
    dt_txt: string,
    day: string
  }[]
}

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  private url: string = 'https://api.openweathermap.org/data/2.5/forecast'
  constructor(
    private http: HttpClient
  ) {}

  getForecast() {
    return this.getUserLocation().pipe(
      map((coords) => {
        return new HttpParams()
          .set('lat', `${coords.lat}`)
          .set('lon', `${coords.long}`)
          .set('units', 'imperial')
          .set('appid', env.WEATHER_KEY)
      }),
      // returns an observable of the API call
      switchMap((params) => {
        return this.http.get<WeatherModel>(this.url, { params })
      }),
      // selecting only the list property
      pluck('list'),
      mergeMap((value) => {
        return of(...value)
      }),
      // could also be a map, but might want filtering later
      filter((value, index) => {
        value.day = value.dt_txt.substring(0, 10)
        // setting weather icon src
        value.weather[0].icon = `http://openweathermap.org/img/w/${value.weather[0].icon}.png`;
        if (value) {
          return true;
        }
        return false;
      }),
      toArray()
    )
  }

  getUserLocation() {
    return new Observable<Coords>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
       (position) => {
         observer.next({ lat: position.coords.latitude, long: position.coords.longitude });
         observer.complete();
       }, (err) => {
         observer.error(err)
       }, { timeout: 3000 }); 
    });
  }
}
