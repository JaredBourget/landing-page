import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as env from '../../../config.json';

interface Coords {
  lat: number,
  long: number
}

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  private url: string = 'https://api.openweathermap.org/data/2.5/forecast'
  constructor(
    private http: HttpClient
  ) {}

  getForecast(): Observable<any> {
    return this.getUserLocation().pipe(
      map((coords) => {
        return new HttpParams()
          .set('lat', `${coords.lat}`)
          .set('lon', `${coords.long}`)
          .set('units', 'imperial')
          .set('appid', env.WEATHER_KEY)
      }),
      switchMap((params) => {
        return this.http.get(this.url, { params })
      })
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
