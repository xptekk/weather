import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { HeaderComponent } from './header.component';

@Component({
  selector: 'mat-toolbar',
  template: '<p>toolbar</p>',
})
class MockToolbar {}

@Component({
  selector: 'mat-icon',
  template: '<p>icon</p>',
})
class MockIcon {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        MockToolbar,
        MockIcon,
      ],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
