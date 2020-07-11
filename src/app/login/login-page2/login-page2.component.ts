import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile.service';

@Component({
  selector: 'login-page-2',
  templateUrl: './login-page2.component.html',
  styleUrls: ['./login-page2.component.scss']
})
export class LoginPage2Component implements OnInit {
  @Input() showHeader = true;
  inValidEmail = false;
  emailExists = false;
  day: any;
  month: any;
  year: any;

  constructor(
    public userprofileService: UserprofileService,
    private router: Router
  ) { }

  ngOnInit() {
    localStorage.setItem('currentUserProfile', JSON.stringify(this.userprofileService.userProfile));
    this.prepareBirthday();
  }

  emailValidation(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail)) {
      return (true);
    }
    return (false);
  }

  prepareBirthday() {
    const birthday = this.userprofileService.userProfile[0].field_birthday_export;
    const date = (birthday) ? new Date(birthday) : new Date();
    this.day = date.getDate();
    this.month = date.getMonth();
    this.year = date.getFullYear();
  }

  years() {
    const currentYear = (new Date()).getFullYear();
    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
    return range(currentYear, currentYear - 100, -1);
  }

  validate() {
    if (!this.emailExists && !this.inValidEmail) {
      this.userprofileService.userProfile[0].field_birthday_export = this.year + '-' + this.month + '-' + this.day;
      this.router.navigate(['/login/3']);
    }
  }

  checkEmail() {
    if (!this.emailValidation(this.userprofileService.userProfile[0].name_export)) {
      this.inValidEmail = true;
    } else {
      this.inValidEmail = false;
    }
    if (this.userprofileService.userProfile[0].name_export && !this.userprofileService.isLoggedIn()) {
      this.userprofileService.checkEmail(this.userprofileService.userProfile[0].name_export).subscribe(res => {
        const response: any = res;
        if (response.message === 'exists') {
          this.emailExists = true;
        } else {
          this.emailExists = false;
        }
      });
    }
  }


}
