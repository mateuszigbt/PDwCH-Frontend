import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMidWindowComponent } from './main-mid-window.component';

describe('MainMidWindowComponent', () => {
  let component: MainMidWindowComponent;
  let fixture: ComponentFixture<MainMidWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainMidWindowComponent]
    });
    fixture = TestBed.createComponent(MainMidWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
