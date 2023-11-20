import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { WEATHER_API_KEY, WEATHER_API_URL } from './app.const';
import { Weather } from './weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    @Inject(WEATHER_API_URL) private API_URL: string,
    @Inject(WEATHER_API_KEY) private API_KEY: string,
    private http: HttpClient,
  ) { }

  getWeatherByCity(city: string): Observable<Weather> {
    const url = this.API_URL + 'weather';
    const params = new HttpParams()
      .set('units', 'metric')
      .set('q', city)
      .set('appId', this.API_KEY);
    return this.http.get<Weather>(url, { params });
  }
}
