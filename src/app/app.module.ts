import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';

import { WEATHER_API_URL, WEATHER_API_KEY } from './app.const';
import { environment } from '../environments/environment';
import { WeatherComponent } from './weather/weather.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatIconModule,
    MatInputModule,
    MatCardModule,
  ],
  providers: [
    { provide: WEATHER_API_URL, useValue: environment.weather_api_url },
    { provide: WEATHER_API_KEY, useValue: environment.weather_api_key },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
