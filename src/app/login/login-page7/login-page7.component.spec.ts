import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPage7Component } from './login-page7.component';

describe('LoginPage7Component', () => {
  let component: LoginPage7Component;
  let fixture: ComponentFixture<LoginPage7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
