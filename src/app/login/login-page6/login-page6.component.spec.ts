import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPage6Component } from './login-page6.component';

describe('LoginPage6Component', () => {
  let component: LoginPage6Component;
  let fixture: ComponentFixture<LoginPage6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
