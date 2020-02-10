import { Component, OnInit } from '@angular/core';
import {UserprofileService} from './../services/userprofile.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    name: '',
    pass: ''
  };
  constructor(
    private userProfileService: UserprofileService
  ) { }

  ngOnInit() {
  }
  login(userInfo) {
    console.log(userInfo);
    this.userProfileService.login(userInfo);
  }

}
