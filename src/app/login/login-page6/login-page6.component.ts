import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { UserprofileService } from 'src/app/services/userprofile.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login.component';

@Component({
  selector: 'login-page-6',
  templateUrl: './login-page6.component.html',
  styleUrls: ['./login-page6.component.scss']
})
export class LoginPage6Component implements OnInit {
  @Input() showHeader = true;
  showPopup = false;
  showLoader = false;
  constructor(
    public userprofileService: UserprofileService,
    private appData: AppDataService,
    private router: Router
  ) { }

  ngOnInit() {
    localStorage.setItem('currentUserProfile', JSON.stringify(this.userprofileService.userProfile));
  }

  saveUser() {
    this.showLoader = true;
    this.userprofileService.saveProfile().subscribe((res) => {
      const response: any = res;
      if (response && response.message && response.message === 'create success' ||
          response && response.message && response.message === 'update success') {
        this.userprofileService.userProfile[0].uid_export = response.uid;
        this.userprofileService.userProfile[0].field_profile_number_export = response.profile_number;
        localStorage.setItem('currentUserProfile', JSON.stringify(this.userprofileService.userProfile));
        this.showLoader = false;
        this.showPopup = true;
        setTimeout(() => {
          this.showPopup = false;
          this.router.navigate(['/login/7']);
        }, 400000);
      }
    },
    (err) => {
      console.error(err);
      this.showLoader = false;
    });
    /*
    if ( this.userprofileService.isLoggedIn() ) {
      this.userprofileService.saveProfile().subscribe((res) => {
        const response: any = res;
        if (response && response.message && response.message === 'success') {
          this.router.navigate(['/login/7']);
        }
      });
    } else {
      this.userprofileService.registerUser(this.userprofileService.userProfile[0]).subscribe((res) => {
        const response: any = res;
        if (response && response.message && response.message === 'success') {
          this.router.navigate(['/login/7']);
        }
      });
    }
    */
  }

}
