import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { Weather } from '../weather';
import { WeatherComponent } from './weather.component';
import { WeatherService } from '../weather.service';

const MOCK_WEATHER: Weather = {
    weather: [{main:'Clouds', icon:'03n'}],
    main: { temp: 0, pressure: 0, humidity: 0 },
    wind: { speed: 0 },
    sys: { country: 'FI' },
    name: 'Helsinki'
};

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let weatherService: jasmine.SpyObj<WeatherService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      imports: [
        NoopAnimationsModule,
        MatInputModule,
        MatCardModule,
      ],
      providers: [
        {
          provide: WeatherService,
          useValue: jasmine.createSpyObj('WeatherService', ['getWeatherByCity'])
        }
      ]
    });
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display weather on city search', fakeAsync(() => {
    const cityInput = fixture.debugElement.query(By.css('#city-input')).nativeElement;
    const searchIcon = fixture.debugElement.query(By.css('#search-city')).nativeElement;
    weatherService.getWeatherByCity.and.returnValue(of(MOCK_WEATHER));
    cityInput.value = 'Helsinki';
    cityInput.dispatchEvent(new Event('input'));
    searchIcon.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();
    expect(weatherService.getWeatherByCity).toHaveBeenCalledWith('Helsinki');

    expect(component.weather).toEqual(MOCK_WEATHER);
    const card = fixture.debugElement.query(By.css('mat-card'));
    expect(card.nativeElement.textContent).toContain('Helsinki');
  }));
});
