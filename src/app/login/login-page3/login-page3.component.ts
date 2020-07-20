import { Component, OnInit, Input } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { UserprofileService } from 'src/app/services/userprofile.service';

@Component({
  selector: 'login-page-3',
  templateUrl: './login-page3.component.html',
  styleUrls: ['./login-page3.component.scss']
})
export class LoginPage3Component implements OnInit {
  @Input() showHeader = true;
  listofShirtSizes: any;
  listofPantSizes: any;
  listofSuitSizes: any;
  listofShoeSizes: any;
  listofHairColors: string[];
  listofEyeColors: string[];
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
  listOfHairColorNames: unknown[];
  listOfHairColorIDs: string[];
  listOfEyeColorNames: unknown[];
  listOfEyeColorIDs: string[];

  constructor(
    public userprofileService: UserprofileService,
    private appData: AppDataService
  ) { }

  ngOnInit() {
    localStorage.setItem('currentUserProfile', JSON.stringify(this.userprofileService.userProfile));
    this.appData.getFieldAvailableOptions('field_shirt_size_from').subscribe(res => {
      const response: any = res;
      this.listofShirtSizes = Object.keys(response.settings.allowed_values);
      this.toggleOptions();
    });
    this.appData.getFieldAvailableOptions('field_pant_size_from').subscribe(res => {
      const response: any = res;
      this.listofPantSizes = Object.keys(response.settings.allowed_values);
      this.toggleOptions();
    });
    this.appData.getFieldAvailableOptions('field_suit_size_from').subscribe(res => {
      const response: any = res;
      this.listofSuitSizes = Object.keys(response.settings.allowed_values);
      this.toggleOptions();
    });
    this.appData.getFieldAvailableOptions('field_shoe_size_from').subscribe(res => {
      const response: any = res;
      this.listofShoeSizes = Object.keys(response.settings.allowed_values);
      this.toggleOptions();
    });
    this.appData.getFieldAvailableOptions('field_hair_color').subscribe(res => {
      const response: any = res;
      this.listofHairColors = response.settings.allowed_values;
      this.listOfHairColorNames = Object.values(response.settings.allowed_values);
      this.listOfHairColorIDs = Object.keys(this.listofHairColors);

      localStorage.setItem('listOfHairColorNames', JSON.stringify(this.listOfHairColorNames));
      localStorage.setItem('listOfHairColorIDs', JSON.stringify(this.listOfHairColorIDs));
      localStorage.setItem('listofHairColors', JSON.stringify(this.listofHairColors));
      this.toggleOptions();
    });
    this.appData.getFieldAvailableOptions('field_eye_color').subscribe(res => {
      const response: any = res;
      this.listofEyeColors = response.settings.allowed_values;
      this.listOfEyeColorNames = Object.values(response.settings.allowed_values);
      this.listOfEyeColorIDs = Object.keys(this.listofEyeColors);

      localStorage.setItem('listOfEyeColorNames', JSON.stringify(this.listOfEyeColorNames));
      localStorage.setItem('listOfEyeColorIDs', JSON.stringify(this.listOfEyeColorIDs));
      localStorage.setItem('listofEyeColors', JSON.stringify(this.listofEyeColors));
      this.toggleOptions();
    });
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
      if (this.userprofileService.userProfile[0].field_gender_export == '1') {
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
}
