import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { WeatherService } from './weather.service';
import { Weather } from './weather';
import { WEATHER_API_KEY, WEATHER_API_URL } from './app.const';

const MOCK_API_KEY = 'RnJlZSBQYWxlc3RpbmU=';
const MOCK_API_URL = 'https://testing.it/api/3.14/';
const MOCK_WEATHER: Weather = {
    weather: [],
    main: { temp: 0, pressure: 0, humidity: 0 },
    wind: { speed: 0 },
    sys: { country: '' },
    name: ''
};

describe('WeatherService', () => {
  let service: WeatherService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: WEATHER_API_KEY, useValue: MOCK_API_KEY },
        { provide: WEATHER_API_URL, useValue: MOCK_API_URL },
      ]
    });
    service = TestBed.inject(WeatherService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get weather by city', () => {
    const city = 'Helsinki';
    const expectedUrl = MOCK_API_URL
      + 'weather?units=metric'
      + `&q=${city}`
      + `&appId=${MOCK_API_KEY}`;

    service.getWeatherByCity('Helsinki').subscribe(response => {
      expect(response).toEqual(MOCK_WEATHER);
    });

    const request = httpController.expectOne({
      method: 'GET',
      url: expectedUrl,
    });

    request.flush(MOCK_WEATHER);
  });
});
