import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelfaresComponent } from './welfares.component';

describe('WelfaresComponent', () => {
  let component: WelfaresComponent;
  let fixture: ComponentFixture<WelfaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelfaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelfaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
