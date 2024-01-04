import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveQuizComponent } from './resolve-quiz.component';

describe('ResolveQuizComponent', () => {
  let component: ResolveQuizComponent;
  let fixture: ComponentFixture<ResolveQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResolveQuizComponent]
    });
    fixture = TestBed.createComponent(ResolveQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
