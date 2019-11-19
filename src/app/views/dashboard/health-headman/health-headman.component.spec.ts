import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthHeadmanComponent } from './health-headman.component';

describe('HealthHeadmanComponent', () => {
  let component: HealthHeadmanComponent;
  let fixture: ComponentFixture<HealthHeadmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthHeadmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthHeadmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
