import { Component, OnInit } from '@angular/core';
import { UserprofileService } from '../services/userprofile.service';
import { AppDataService } from '../services/app-data.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-customerlogin',
  templateUrl: './customerlogin.component.html',
  styleUrls: ['./customerlogin.component.scss']
})
export class CustomerloginComponent implements OnInit {
  user = {
    name: '',
    pass: ''
  };
  loadSpinner = false;
  wrongCredentials = false;
  wrongCredentialsCustomer = false;
  constructor(
    public userprofileService: UserprofileService,
    private appData: AppDataService,
    private cookie: CookieService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  navigateToCreateCustomer() {
    this.router.navigate(['/customer-create']);
  }
  login(userInfo) {
    this.loadSpinner = true;
    this.wrongCredentials = false;
    this.wrongCredentialsCustomer = false;
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
      },
      (err) => {
        this.loadSpinner = false;
        if (userInfo.role === 'model') {
          this.wrongCredentials = true;
        } else {
          this.wrongCredentialsCustomer = true;
        }
      }
    );
  }

  loginCustomer(userInfo, role = 'customer') {
    userInfo.role = role;
    this.login(userInfo);
  }
}
