import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPage4Component } from './login-page4.component';

describe('LoginPage4Component', () => {
  let component: LoginPage4Component;
  let fixture: ComponentFixture<LoginPage4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
