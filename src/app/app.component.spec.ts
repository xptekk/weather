import { Component } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

import { AppComponent } from './app.component';

@Component({
  selector: 'app-weather',
  template: '<p>Couldn\'t stand the weather</p>',
})
class FakeWeatherComponent {}

@Component({
  selector: 'app-header',
  template: '<p>Weather App</p>',
})
class FakeHeaderComponent {}

const mockSwUpdate = {
  get versionUpdates () {return {};},
  activateUpdate: () => { return new Promise((_, rej) => rej(false)); },
};

const mockSnackBar = jasmine.createSpyObj('MatSnackBar',
  ['open', 'afterDismissed']);

const mockLocation = jasmine.createSpyObj('Location', ['go']);

describe('AppComponent', () => {
  let app: AppComponent;

  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      AppComponent,
      FakeWeatherComponent,
      FakeHeaderComponent,
    ],
    providers: [
      {
        provide: SwUpdate,
        useValue: mockSwUpdate,
      },
      {
        provide: MatSnackBar,
        useValue: mockSnackBar,
      },
      {
        provide: Location,
        useValue: mockLocation,
      }
    ],
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should open snackbar for version ready update', fakeAsync(() => {
    spyOnProperty(mockSwUpdate, 'versionUpdates', 'get')
      .and.returnValue(of({ type: 'VERSION_READY' } as VersionEvent));

    spyOn(mockSwUpdate, 'activateUpdate').and.returnValue(new Promise(
      (resolve, _) => { resolve(true); }
    ));

    mockSnackBar.afterDismissed.and.returnValue(of({
      dismissedByAction: true,
    }));

    mockSnackBar.open.and.returnValue(mockSnackBar);

    // TODO: fix this unit test
    // app.ngOnInit();
    //
    // tick();
    //
    // expect(mockSnackBar.open).toHaveBeenCalled();
    // expect(mockLocation.go).toHaveBeenCalled();
  }));
});
