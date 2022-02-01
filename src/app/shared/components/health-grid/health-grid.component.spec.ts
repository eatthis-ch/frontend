import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthGridComponent } from './health-grid.component';

describe('HealthGridComponent', () => {
  let component: HealthGridComponent;
  let fixture: ComponentFixture<HealthGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
