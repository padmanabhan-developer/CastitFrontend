import { AppDataService } from 'src/app/services/app-data.service';
import { RouterModule, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {UserprofileService} from './../services/userprofile.service';
import { CookieService } from 'ngx-cookie-service';

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
  customer = {
    name: '',
    pass: ''
  };
  constructor(
    public userprofileService: UserprofileService,
    public appService: AppDataService,
    private cookie: CookieService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  login(userInfo) {
    if (!userInfo.role) {
      userInfo.role = 'model';
    }
    this.userprofileService.login(userInfo).subscribe(
      (res) => {
        const response: any = res;
        console.log(response);
        if (response.current_user && response.current_user.uid) {
          this.cookie.set('x-csrf-token', res['csrf_token']);
          localStorage.setItem('userLoginResponse', JSON.stringify(res));
          this.userprofileService.loadProfile(response.current_user.uid, userInfo.role).subscribe(
            (res) => {
              if (res) {
                this.userprofileService.userProfile = res;
                localStorage.setItem('currentUserProfile', JSON.stringify(this.userprofileService.userProfile));
                const navigateTo = (userInfo.role === 'model') ? '/login/1' : '/profiles'; 
                this.router.navigate([navigateTo]);
              }
            }
          );
        }
      }
    );
  }

  loginCustomer(userInfo, role = 'customer') {
    userInfo.role = role;
    this.login(userInfo);
  }

}
