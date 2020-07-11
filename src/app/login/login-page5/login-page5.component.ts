import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile.service';
import { AppDataService } from 'src/app/services/app-data.service';

@Component({
  selector: 'login-page-5',
  templateUrl: './login-page5.component.html',
  styleUrls: ['./login-page5.component.scss']
})
export class LoginPage5Component implements OnInit {
  @Input() showHeader = true;
  listOfLanguages: any;
  listOfLanguageIDs: string[];
  listOfLanguageNames: unknown[];
  currentRate = 3;
  emptyLanguage = false;
  emptyRating = false;
  constructor(
    public userprofileService: UserprofileService,
    private appData: AppDataService,
    private router: Router
  ) { }

  ngOnInit() {
    localStorage.setItem('currentUserProfile', JSON.stringify(this.userprofileService.userProfile));
    this.appData.getFieldAvailableOptions('field_language_one').subscribe(res => {
      const respose: any = res;
      this.listOfLanguages = respose.settings.allowed_values;
      this.listOfLanguageIDs = Object.keys(this.listOfLanguages);
      this.listOfLanguageNames = Object.values(this.listOfLanguages);
    });
  }

  validate() {
    if (!this.userprofileService.userProfile[0].field_language_one_export) {
      this.emptyLanguage = true;
    } else {
      this.emptyLanguage = false;
    }

    if (!this.userprofileService.userProfile[0].field_language_one_rating_export) {
      this.emptyRating = true;
    } else {
      this.emptyRating = false;
    }

    if(!this.emptyRating && !this.emptyLanguage) {
      this.router.navigate(['/login/6']);
    }
  }

}
