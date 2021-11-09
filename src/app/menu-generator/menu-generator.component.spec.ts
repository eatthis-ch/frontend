import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGeneratorComponent } from './menu-generator.component';

describe('MenuGeneratorComponent', () => {
  let component: MenuGeneratorComponent;
  let fixture: ComponentFixture<MenuGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
