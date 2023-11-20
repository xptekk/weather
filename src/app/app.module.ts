import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { WEATHER_API_URL, WEATHER_API_KEY } from './app.const';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: WEATHER_API_URL, useValue: environment.weather_api_url },
    { provide: WEATHER_API_KEY, useValue: environment.weather_api_key },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
