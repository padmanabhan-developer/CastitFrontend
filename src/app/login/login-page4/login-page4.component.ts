import { Component, OnInit, Input } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile.service';
import { AppDataService } from 'src/app/services/app-data.service';

@Component({
  selector: 'login-page-4',
  templateUrl: './login-page4.component.html',
  styleUrls: ['./login-page4.component.scss']
})
export class LoginPage4Component implements OnInit {
  @Input() showHeader = true;
  listOfSkills: any;
  listOfSkillIDs: any;
  listOfSkillNames: any;
  listOfCategories: any;
  listOfCategoryIDs: any;
  listOfCategoryNames: any;
  listOfLicenses: any;
  listOfLicenseIDs: any;
  listOfLicenseNames: any;

  constructor(
    public userprofileService: UserprofileService,
    private appData: AppDataService
  ) { }

  ngOnInit() {
    localStorage.setItem('currentUserProfile', JSON.stringify(this.userprofileService.userProfile));
    this.appData.getFieldAvailableOptions('field_skills').subscribe(res => {
      const respose: any = res;
      this.listOfSkills = respose.settings.allowed_values;
      this.listOfSkillIDs = Object.keys(this.listOfSkills);
      this.listOfSkillNames = Object.values(this.listOfSkills);
    });
    this.appData.getFieldAvailableOptions('field_category').subscribe(res => {
      const respose: any = res;
      this.listOfCategories = respose.settings.allowed_values;
      this.listOfCategoryIDs = Object.keys(this.listOfCategories);
      this.listOfCategoryNames = Object.values(this.listOfCategories);
      console.log('cat',this.listOfCategories);
      console.log('cat',this.listOfCategoryIDs);
      console.log('cat',this.listOfCategoryNames);
    });
    this.appData.getFieldAvailableOptions('field_licenses').subscribe(res => {
      const respose: any = res;
      this.listOfLicenses = respose.settings.allowed_values;
      this.listOfLicenseIDs = Object.keys(this.listOfLicenses);
      this.listOfLicenseNames = Object.values(this.listOfLicenses);
    });
  }
  setValue(type, index) {
    switch (type) {
      case 'category':
        if (this.userprofileService.userProfile[0].field_category_export.indexOf(this.listOfCategoryIDs[index]) > -1) {
          const newCategories = this.userprofileService.userProfile[0].field_category_export.filter((value, idx, arr) => {
            return value !== this.listOfCategoryIDs[index];
          });
          this.userprofileService.userProfile[0].field_category_export = newCategories;
        } else {
          this.userprofileService.userProfile[0].field_category_export.push(this.listOfCategoryIDs[index]);
        }
        break;
      case 'skill':
        if (this.userprofileService.userProfile[0].field_skills_export.indexOf(this.listOfSkillIDs[index]) > -1) {
          const newSkills = this.userprofileService.userProfile[0].field_skills_export.filter((value, idx, arr) => {
            return value !== this.listOfSkillIDs[index];
          });
          this.userprofileService.userProfile[0].field_skills_export = newSkills;
        } else {
          this.userprofileService.userProfile[0].field_skills_export.push(this.listOfSkillIDs[index]);
        }
        break;
      case 'license':
        if (this.userprofileService.userProfile[0].field_licenses_export.indexOf(this.listOfLicenseIDs[index]) > -1) {
          const newLicenses = this.userprofileService.userProfile[0].field_licenses_export.filter((value, idx, arr) => {
            return value !== this.listOfLicenseIDs[index];
          });
          this.userprofileService.userProfile[0].field_licenses_export = newLicenses;
        } else {
          this.userprofileService.userProfile[0].field_licenses_export.push(this.listOfLicenseIDs[index]);
        }
        break;
      default:
        break;
    }
  }
  checkPresence(type, index) {
    switch (type) {
      case 'category':
        if (this.userprofileService.userProfile[0].field_category_export.indexOf(this.listOfCategoryIDs[index]) > -1) {
          return true;
        } else {
          return false;
        }
      case 'skill':
        if (this.userprofileService.userProfile[0].field_skills_export.indexOf(this.listOfSkillIDs[index]) > -1) {
          return true;
        } else {
          return false;
        }
      case 'license':
        if (this.userprofileService.userProfile[0].field_licenses_export.indexOf(this.listOfLicenseIDs[index]) > -1) {
          return true;
        } else {
          return false;
        }
      default:
        return false;
    }
  }
}