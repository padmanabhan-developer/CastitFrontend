import { Router } from '@angular/router';
import { AppDataService } from 'src/app/services/app-data.service';
import { UserprofileService } from './../../services/userprofile.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'login-page1',
  templateUrl: './login-page1.component.html',
  styleUrls: ['./login-page1.component.scss']
})
export class LoginPage1Component implements OnInit {
  @Input() showHeader = true;
  password = {
    first: this.userprofileService.userProfile[0].password,
    confirm: this.userprofileService.userProfile[0].password
  };
  listOfCountries: any;
  listOfCountryIDs: string[];
  listOfCountryNames: unknown[];

  noFirstName = false;
  passwordsMismatch = false;

  constructor(
    public userprofileService: UserprofileService,
    private appData: AppDataService,
    private router: Router
  ) { }

  ngOnInit() {
    localStorage.setItem('currentUserProfile', JSON.stringify(this.userprofileService.userProfile));
    this.appData.getFieldAvailableOptions('field_country').subscribe(res => {
      const respose: any = res;
      this.listOfCountries = respose.settings.allowed_values;
      this.listOfCountryIDs = Object.keys(this.listOfCountries);
      this.listOfCountryNames = Object.values(this.listOfCountries);
    });
  }

  validate() {
    const formModelInfo = this.userprofileService.userProfile[0];
    if (!formModelInfo.field_first_name_export) {
      this.noFirstName = true;
    } else {
      this.noFirstName = false;
    }
    if (!(this.password.first === this.password.confirm)) {
      this.passwordsMismatch = true;
    } else {
      this.passwordsMismatch = false;
      this.userprofileService.userProfile[0].password = this.password.confirm;
    }

    if (!this.noFirstName && !this.passwordsMismatch) {
      this.router.navigate(['/login/2']);
    }
  }

}
