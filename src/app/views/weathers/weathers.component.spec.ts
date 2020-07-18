import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeathersComponent } from './weathers.component';

describe('WeathersComponent', () => {
  let component: WeathersComponent;
  let fixture: ComponentFixture<WeathersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeathersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeathersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
