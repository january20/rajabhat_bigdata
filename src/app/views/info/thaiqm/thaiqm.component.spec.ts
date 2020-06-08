import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThaiqmComponent } from './thaiqm.component';

describe('ThaiqmComponent', () => {
  let component: ThaiqmComponent;
  let fixture: ComponentFixture<ThaiqmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThaiqmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThaiqmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
