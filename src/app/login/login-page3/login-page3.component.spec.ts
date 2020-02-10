import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPage3Component } from './login-page3.component';

describe('LoginPage3Component', () => {
  let component: LoginPage3Component;
  let fixture: ComponentFixture<LoginPage3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
