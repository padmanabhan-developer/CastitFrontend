import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPage5Component } from './login-page5.component';

describe('LoginPage5Component', () => {
  let component: LoginPage5Component;
  let fixture: ComponentFixture<LoginPage5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
