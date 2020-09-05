import { AdminService } from './../services/admin.service';
import { Component, OnInit, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import { AppDataService } from '../services/app-data.service';
import { UserprofileService } from '../services/userprofile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-user-info',
  templateUrl: './admin-user-info.component.html',
  styleUrls: ['./admin-user-info.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AdminUserInfoComponent implements OnInit {
  @Input() userData: any = {};

  selectedUser = '';
  password = {
    first: '',
    confirm: ''
  };
  listOfCountries: any;
  listOfCountryIDs: any;
  listOfCountryNames: any;
  info: string;
  listofShirtSizes: any;
  listofPantSizes: any;
  listofSuitSizes: any;
  listofShoeSizes: any;
  listofHairColors: any;
  listofEyeColors: any;
  listOfSkills: any;
  listOfSkillIDs: any;
  listOfSkillNames: any;
  listOfCategories: any;
  listOfCategoryIDs: any;
  listOfCategoryNames: any;
  listOfLicenses: any;
  listOfLicenseIDs: any;
  listOfLicenseNames: any;
  listOfLanguages: any;
  listOfLanguageIDs: any;
  listOfLanguageNames: any;
  day: number;
  month: number;
  year: number;
  showChildrenSizes = false;

  maleShirtMin = 35;
  maleShirtMax = 46;
  femaleShirtMin = 32;
  femaleShirtMax = 58;
  childShirtMin = 86;
  childShirtMax = 170;

  malePantMin = 26;
  malePantMax = 42;
  femalePantMin = 32;
  femalePantMax = 58;
  childPantMin = 86;
  childPantMax = 170;

  maleShoeMin = 34;
  maleShoeMax = 55;
  femaleShoeMin = 34;
  femaleShoeMax = 48;
  childShoeMin = 17;
  childShoeMax = 42;
  PantSizes: any;
  ShirtSizes: any;
  ShoeSizes: any;
  firstName: string;
  eyeColorsArray: any;
  hairColorsArray: any;
  listOfHairColorNames: any;
  listOfHairColorIDs: string[];
  listOfEyeColorNames: any;
  listOfEyeColorIDs: string[];
  emptyLanguage = false;
  emptyRating = false;
  listOfStatuses: any;
  listOfStatus: any;
  listOfStatusID: any;
  constructor(
    public appData: AppDataService,
    public userprofileService: UserprofileService,
    public adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit() {
    this.firstName = this.adminService.userData[0].field_first_name_export ? this.adminService.userData[0].field_first_name_export : ' - ';
    this.selectedUser = JSON.stringify(this.adminService.userData[0]);
    this.password = {
      first: '',
      confirm: ''
    };
    this.prepareBirthday();

    this.listOfCountryIDs = JSON.parse(localStorage.getItem('listOfCountryIDs'));
    this.listOfCountryNames = JSON.parse(localStorage.getItem('listOfCountryNames'));
    this.listofShirtSizes = JSON.parse(localStorage.getItem('listofShirtSizes'));
    this.listofPantSizes = JSON.parse(localStorage.getItem('listofPantSizes'));
    this.listofSuitSizes = JSON.parse(localStorage.getItem('listofSuitSizes'));
    this.listofShoeSizes = JSON.parse(localStorage.getItem('listofShoeSizes'));
    // this.listofHairColors = JSON.parse(localStorage.getItem('listofHairColors'));
    // this.listOfHairColorNames = JSON.parse(localStorage.getItem('listOfHairColorNames'));
    // this.listOfHairColorIDs = JSON.parse(localStorage.getItem('listOfHairColorIDs'));
    // this.listofEyeColors = JSON.parse(localStorage.getItem('listofEyeColors'));
    // this.listOfEyeColorNames = JSON.parse(localStorage.getItem('listOfEyeColorNames'));
    // this.listOfEyeColorIDs = JSON.parse(localStorage.getItem('listOfEyeColorIDs'));
    this.listOfSkillIDs = JSON.parse(localStorage.getItem('listOfSkillIDs'));
    this.listOfSkillNames = JSON.parse(localStorage.getItem('listOfSkillNames'));
    this.listOfCategoryIDs = JSON.parse(localStorage.getItem('listOfCategoryIDs'));
    this.listOfCategoryNames = JSON.parse(localStorage.getItem('listOfCategoryNames'));
    this.listOfLicenseIDs = JSON.parse(localStorage.getItem('listOfLicenseIDs'));
    this.listOfLicenseNames = JSON.parse(localStorage.getItem('listOfLicenseNames'));
    this.listOfLanguageIDs = JSON.parse(localStorage.getItem('listOfLanguageIDs'));
    this.listOfLanguageNames = JSON.parse(localStorage.getItem('listOfLanguageNames'));
    this.listOfStatus = JSON.parse(localStorage.getItem('listOfStatus'));
    this.listOfStatusID = JSON.parse(localStorage.getItem('listOfStatusID'));


    if (!this.listOfStatuses) {
    this.appData.getFieldAvailableOptions('field_profile_status').subscribe(res => {
      const response: any = res;
      this.listOfStatuses = response.settings.allowed_values;
      this.listOfStatusID = Object.keys(this.listOfStatuses);
      this.listOfStatus = Object.values(this.listOfStatuses);
      localStorage.setItem('listOfStatus', JSON.stringify(this.listOfStatus));
      localStorage.setItem('listOfStatusID', JSON.stringify(this.listOfStatusID));
    }); }

    if (!this.listOfCountryIDs) {
    this.appData.getFieldAvailableOptions('field_country').subscribe(res => {
      const response: any = res;
      this.listOfCountries = response.settings.allowed_values;
      this.listOfCountryIDs = Object.keys(this.listOfCountries);
      this.listOfCountryNames = Object.values(this.listOfCountries);
      localStorage.setItem('listOfCountryIDs', JSON.stringify(this.listOfCountryIDs));
      localStorage.setItem('listOfCountryNames', JSON.stringify(this.listOfCountryNames));
    }); }
    if (!this.listofShirtSizes) {
    this.appData.getFieldAvailableOptions('field_shirt_size_from').subscribe(res => {
      const response: any = res;
      this.listofShirtSizes = Object.keys(response.settings.allowed_values);
      localStorage.setItem('listofShirtSizes', JSON.stringify(this.listofShirtSizes));
    }); }
    if (!this.listofPantSizes) {
    this.appData.getFieldAvailableOptions('field_pant_size_from').subscribe(res => {
      const response: any = res;
      this.listofPantSizes = Object.keys(response.settings.allowed_values);
      localStorage.setItem('listofPantSizes', JSON.stringify(this.listofPantSizes));
    }); }
    if (!this.listofSuitSizes) {
    this.appData.getFieldAvailableOptions('field_suit_size_from').subscribe(res => {
      const response: any = res;
      this.listofSuitSizes = Object.keys(response.settings.allowed_values);
      localStorage.setItem('listofSuitSizes', JSON.stringify(this.listofSuitSizes));
    }); }
    if (!this.listofShoeSizes) {
    this.appData.getFieldAvailableOptions('field_shoe_size_from').subscribe(res => {
      const response: any = res;
      this.listofShoeSizes = Object.keys(response.settings.allowed_values);
      localStorage.setItem('listofShoeSizes', JSON.stringify(this.listofShoeSizes));
    }); }

    if (!this.listofHairColors || !this.listOfHairColorNames) {
    this.appData.getFieldAvailableOptions('field_hair_color').subscribe(res => {
      const response: any = res;
      this.listofHairColors = response.settings.allowed_values;
      this.listOfHairColorNames = Object.values(response.settings.allowed_values);
      this.listOfHairColorIDs = Object.keys(this.listofHairColors);

      localStorage.setItem('listOfHairColorNames', JSON.stringify(this.listOfHairColorNames));
      localStorage.setItem('listOfHairColorIDs', JSON.stringify(this.listOfHairColorIDs));
      localStorage.setItem('listofHairColors', JSON.stringify(this.listofHairColors));

    }); }
    if (!this.listofEyeColors || !this.listOfEyeColorNames) {
    this.appData.getFieldAvailableOptions('field_eye_color').subscribe(res => {
      const response: any = res;
      this.listofEyeColors = response.settings.allowed_values;
      this.listOfEyeColorNames = Object.values(response.settings.allowed_values);
      this.listOfEyeColorIDs = Object.keys(this.listofEyeColors);

      localStorage.setItem('listOfEyeColorNames', JSON.stringify(this.listOfEyeColorNames));
      localStorage.setItem('listOfEyeColorIDs', JSON.stringify(this.listOfEyeColorIDs));
      localStorage.setItem('listofEyeColors', JSON.stringify(this.listofEyeColors));
    }); }

    if (!this.listOfSkillIDs) {
    this.appData.getFieldAvailableOptions('field_skills').subscribe(res => {
      const response: any = res;
      this.listOfSkills = response.settings.allowed_values;
      this.listOfSkillIDs = Object.keys(this.listOfSkills);
      this.listOfSkillNames = Object.values(this.listOfSkills);
      localStorage.setItem('listOfSkillIDs', JSON.stringify(this.listOfSkillIDs));
      localStorage.setItem('listOfSkillNames', JSON.stringify(this.listOfSkillNames));
    }); }
    if (!this.listOfCategoryIDs) {
    this.appData.getFieldAvailableOptions('field_category').subscribe(res => {
      const response: any = res;
      this.listOfCategories = response.settings.allowed_values;
      this.listOfCategoryIDs = Object.keys(this.listOfCategories);
      this.listOfCategoryNames = Object.values(this.listOfCategories);
      localStorage.setItem('listOfCategoryIDs', JSON.stringify(this.listOfCategoryIDs));
      localStorage.setItem('listOfCategoryNames', JSON.stringify(this.listOfCategoryNames));
    }); }
    if (!this.listOfLicenseIDs) {
    this.appData.getFieldAvailableOptions('field_licenses').subscribe(res => {
      const response: any = res;
      this.listOfLicenses = response.settings.allowed_values;
      this.listOfLicenseIDs = Object.keys(this.listOfLicenses);
      this.listOfLicenseNames = Object.values(this.listOfLicenses);
      localStorage.setItem('listOfLicenseIDs', JSON.stringify(this.listOfLicenseIDs));
      localStorage.setItem('listOfLicenseNames', JSON.stringify(this.listOfLicenseNames));
    }); }
    if (!this.listOfLanguageIDs) {
    this.appData.getFieldAvailableOptions('field_language_one').subscribe(res => {
      const response: any = res;
      this.listOfLanguages = response.settings.allowed_values;
      this.listOfLanguageIDs = Object.keys(this.listOfLanguages);
      this.listOfLanguageNames = Object.values(this.listOfLanguages);
      localStorage.setItem('listOfLanguageIDs', JSON.stringify(this.listOfLanguageIDs));
      localStorage.setItem('listOfLanguageNames', JSON.stringify(this.listOfLanguageNames));
    }); }
    if (this.showChildrenSizes) {
      this.PantSizes = this.listofPantSizes.filter((item) => {
        return item >= this.childPantMin && item <= this.childPantMax;
      });
      this.ShirtSizes = this.listofShirtSizes.filter((item) => {
        return item >= this.childShirtMin && item <= this.childShirtMax;
      });
      this.ShoeSizes = this.listofShoeSizes.filter((item) => {
        return item >= this.childShoeMin && item <= this.childShoeMax;
      });
    } else {
      if (this.adminService.userData[0].field_gender_export === '1') {
        this.PantSizes = this.listofPantSizes.filter((item) => {
          return item >= this.malePantMin && item <= this.malePantMax;
        });
        this.ShirtSizes = this.listofShirtSizes.filter((item) => {
          return item >= this.maleShirtMin && item <= this.maleShirtMax;
        });
        this.ShoeSizes = this.listofShoeSizes.filter((item) => {
          return item >= this.maleShoeMin && item <= this.maleShoeMax;
        });
      } else {
        this.PantSizes = this.listofPantSizes.filter((item) => {
          return item >= this.femalePantMin && item <= this.femalePantMax;
        });
        this.ShirtSizes = this.listofShirtSizes.filter((item) => {
          return item >= this.femaleShirtMin && item <= this.femaleShirtMax;
        });
        this.ShoeSizes = this.listofShoeSizes.filter((item) => {
          return item >= this.femaleShoeMin && item <= this.femaleShoeMax;
        });
      }
    }
  }

  changeSelect(event) {
    console.log(event);
  }

  prepareBirthday() {
    const birthday = this.adminService.userData[0].field_birthday_export;
    const date = (birthday) ? new Date(birthday) : new Date();
    this.day = date.getDate();
    this.month = date.getMonth();
    this.year = date.getFullYear();
  }

  childrenSizes() {
    console.log(this.showChildrenSizes);
    this.toggleOptions();
    return this.showChildrenSizes;
  }
  toggleOptions() {
    if (this.showChildrenSizes) {
      this.PantSizes = this.listofPantSizes.filter((item) => {
        return item >= this.childPantMin && item <= this.childPantMax;
      });
      this.ShirtSizes = this.listofShirtSizes.filter((item) => {
        return item >= this.childShirtMin && item <= this.childShirtMax;
      });
      this.ShoeSizes = this.listofShoeSizes.filter((item) => {
        return item >= this.childShoeMin && item <= this.childShoeMax;
      });
    } else {
      if (this.adminService.userData[0].field_gender_export === '1') {
        this.PantSizes = this.listofPantSizes.filter((item) => {
          return item >= this.malePantMin && item <= this.malePantMax;
        });
        this.ShirtSizes = this.listofShirtSizes.filter((item) => {
          return item >= this.maleShirtMin && item <= this.maleShirtMax;
        });
        this.ShoeSizes = this.listofShoeSizes.filter((item) => {
          return item >= this.maleShoeMin && item <= this.maleShoeMax;
        });
      } else {
        this.PantSizes = this.listofPantSizes.filter((item) => {
          return item >= this.femalePantMin && item <= this.femalePantMax;
        });
        this.ShirtSizes = this.listofShirtSizes.filter((item) => {
          return item >= this.femaleShirtMin && item <= this.femaleShirtMax;
        });
        this.ShoeSizes = this.listofShoeSizes.filter((item) => {
          return item >= this.femaleShoeMin && item <= this.femaleShoeMax;
        });
      }
    }
  }

  setValue(type, index) {
    switch (type) {
      case 'category':
        if (this.adminService.userData[0].field_category_export.indexOf(this.listOfCategoryIDs[index]) > -1) {
          const newCategories = this.adminService.userData[0].field_category_export.filter((value, idx, arr) => {
            return value !== this.listOfCategoryIDs[index];
          });
          this.adminService.userData[0].field_category_export = newCategories;
        } else {
          this.adminService.userData[0].field_category_export.push(this.listOfCategoryIDs[index]);
        }
        break;
      case 'skill':
        if (this.adminService.userData[0].field_skills_export.indexOf(this.listOfSkillIDs[index]) > -1) {
          const newSkills = this.adminService.userData[0].field_skills_export.filter((value, idx, arr) => {
            return value !== this.listOfSkillIDs[index];
          });
          this.adminService.userData[0].field_skills_export = newSkills;
        } else {
          this.adminService.userData[0].field_skills_export.push(this.listOfSkillIDs[index]);
        }
        break;
      case 'license':
        if (this.adminService.userData[0].field_licenses_export.indexOf(this.listOfLicenseIDs[index]) > -1) {
          const newLicenses = this.adminService.userData[0].field_licenses_export.filter((value, idx, arr) => {
            return value !== this.listOfLicenseIDs[index];
          });
          this.adminService.userData[0].field_licenses_export = newLicenses;
        } else {
          this.adminService.userData[0].field_licenses_export.push(this.listOfLicenseIDs[index]);
        }
        break;
      default:
        break;
    }
  }
  saveUser(role = 'model') {
    this.adminService.saveProfile(role, this.adminService.userData[0]).subscribe((res) => {
      const response: any = res;
      if (response && response.message && response.message === 'create success' ||
          response && response.message && response.message === 'update success') {
            alert('Profile updated');
            this.adminService.userData[0].uid_export = response.uid;
        // localStorage.setItem('currentUserProfileByAdmin', JSON.stringify(this.adminService.userData));
        // this.router.navigate(['/login/7']);
      }
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

  changeProfileNewStatus(value) {
    const uid = this.adminService.userData[0].uid_export;
    this.adminService.updateProfileNewStatus(value, uid).subscribe(res => {
      const response: any = res;
      // this.adminService.userData[0].field_new_profile_export = response.profile_new_status;
    });
  }

  setNewProfileNumber() {
    const newProfileType = this.adminService.userData[0].field_profile_type_export;
    const uid = this.adminService.userData[0].uid_export;
    this.adminService.updateProfileTypeAndNumber(newProfileType, uid).subscribe(res => {
      const response: any = res;
      if (response.message === 'success') {
        this.adminService.userData[0].field_profile_number_export = response.field_profile_number;
        if (newProfileType === 'B') {
          this.adminService.userData[0].field_profile_status_export = '5';
        }
      }
    });
  }


}
