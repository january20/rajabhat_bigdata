import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevplansComponent } from './devplans.component';

describe('DevplansComponent', () => {
  let component: DevplansComponent;
  let fixture: ComponentFixture<DevplansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevplansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
