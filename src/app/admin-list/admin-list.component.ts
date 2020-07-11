import { AdminService } from './../services/admin.service';
import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
import { AppDataService } from '../services/app-data.service';
import { UserprofileService } from '../services/userprofile.service';
import { Router, provideRoutes } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class AdminListComponent implements OnInit {
  listData: any[];
  SelectionType = SelectionType;
  rows = [];
  temp = [];
  statusTemplate: TemplateRef<any> ;
  updated = Date.now().toString();
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
  columns = [
    // {
    //   prop: 'selected',
    //   name: '',
    //   sortable: false,
    //   canAutoResize: false,
    //   draggable: false,
    //   resizable: false,
    //   headerCheckboxable: true,
    //   checkboxable: true,
    //   width: 30
    // },
    { prop: 'field_first_name', name: 'First Name' },
    { prop: 'field_last_name', name: 'Last Name' },
    { prop: 'field_profile_number', name: 'Profile Number' },
    { prop: 'created', name: 'Created' },
    { prop: 'updated', name: 'Updated' },
    // { prop: 'field_profile_status', name: 'Status' },
    { prop: 'status', name: 'Status', sortable: false },
    { prop: 'info_link', name: 'View Profile', sortable: false},
    { prop: 'media_link', name: 'View Media', sortable: false}
  ];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  ColumnMode = ColumnMode;
  selected = [];
  currentView = ['all'];
  loadingIndicator = false;
  messages = {
    emptyMessage: 'Trying to fetch data ... ', // Message to show when array is presented, but contains no values
    totalMessage: 'total', // Footer total message
    selectedMessage: 'selected' // Footer selected message
  };
  viewType: string;

  userData: any;
  listOfHairColorNames: unknown[];
  listOfHairColorIDs: string[];
  listOfEyeColorNames: unknown[];
  listOfEyeColorIDs: string[];
  constructor(
    public appService: AppDataService,
    public userprofileService: UserprofileService,
    public adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchListData();

    this.appService.getFieldAvailableOptions('field_country').subscribe(res => {
      const response: any = res;
      this.listOfCountries = response.settings.allowed_values;
      this.listOfCountryIDs = Object.keys(this.listOfCountries);
      this.listOfCountryNames = Object.values(this.listOfCountries);
      localStorage.setItem('listOfCountryIDs', JSON.stringify(this.listOfCountryIDs));
      localStorage.setItem('listOfCountryNames', JSON.stringify(this.listOfCountryNames));
    });
    /*
    this.appService.getFieldAvailableOptions('field_hair_color').subscribe(res => {
      const response: any = res;
      this.listofHairColors = response.settings.allowed_values;
      this.listOfHairColorNames = Object.values(response.settings.allowed_values);
      this.listOfHairColorIDs = Object.keys(this.listofHairColors);

      localStorage.setItem('listOfHairColorNames', JSON.stringify(this.listOfHairColorNames));
      localStorage.setItem('listOfHairColorIDs', JSON.stringify(this.listOfHairColorIDs));
      localStorage.setItem('listofHairColors', JSON.stringify(this.listofHairColors));
    });
    this.appService.getFieldAvailableOptions('field_eye_color').subscribe(res => {
      const response: any = res;
      this.listofEyeColors = response.settings.allowed_values;
      this.listOfEyeColorNames = Object.values(response.settings.allowed_values);
      this.listOfEyeColorIDs = Object.keys(this.listofEyeColors);

      localStorage.setItem('listOfEyeColorNames', JSON.stringify(this.listOfEyeColorNames));
      localStorage.setItem('listOfEyeColorIDs', JSON.stringify(this.listOfEyeColorIDs));
      localStorage.setItem('listofEyeColors', JSON.stringify(this.listofEyeColors));
    });
    */
    this.appService.getFieldAvailableOptions('field_skills').subscribe(res => {
      const response: any = res;
      this.listOfSkills = response.settings.allowed_values;
      this.listOfSkillIDs = Object.keys(this.listOfSkills);
      this.listOfSkillNames = Object.values(this.listOfSkills);
      localStorage.setItem('listOfSkillIDs', JSON.stringify(this.listOfSkillIDs));
      localStorage.setItem('listOfSkillNames', JSON.stringify(this.listOfSkillNames));
    });
    this.appService.getFieldAvailableOptions('field_category').subscribe(res => {
      const response: any = res;
      this.listOfCategories = response.settings.allowed_values;
      this.listOfCategoryIDs = Object.keys(this.listOfCategories);
      this.listOfCategoryNames = Object.values(this.listOfCategories);
      localStorage.setItem('listOfCategoryIDs', JSON.stringify(this.listOfCategoryIDs));
      localStorage.setItem('listOfCategoryNames', JSON.stringify(this.listOfCategoryNames));
    });
    this.appService.getFieldAvailableOptions('field_licenses').subscribe(res => {
      const response: any = res;
      this.listOfLicenses = response.settings.allowed_values;
      this.listOfLicenseIDs = Object.keys(this.listOfLicenses);
      this.listOfLicenseNames = Object.values(this.listOfLicenses);
      localStorage.setItem('listOfLicenseIDs', JSON.stringify(this.listOfLicenseIDs));
      localStorage.setItem('listOfLicenseNames', JSON.stringify(this.listOfLicenseNames));
    });
    this.appService.getFieldAvailableOptions('field_language_one').subscribe(res => {
      const response: any = res;
      this.listOfLanguages = response.settings.allowed_values;
      this.listOfLanguageIDs = Object.keys(this.listOfLanguages);
      this.listOfLanguageNames = Object.values(this.listOfLanguages);
      localStorage.setItem('listOfLanguageIDs', JSON.stringify(this.listOfLanguageIDs));
      localStorage.setItem('listOfLanguageNames', JSON.stringify(this.listOfLanguageNames));
    });

    this.appService.getFieldAvailableOptions('field_pant_size_from').subscribe(res => {
      const response: any = res;
      this.listofPantSizes = Object.keys(response.settings.allowed_values);
      localStorage.setItem('listofPantSizes', JSON.stringify(this.listofPantSizes));
      if (this.showChildrenSizes) {
        this.PantSizes = this.listofPantSizes.filter((item) => {
          return item >= this.childPantMin && item <= this.childPantMax;
        });
      } else {
        if (this.adminService.userData[0].field_gender_export == '1') {
          this.PantSizes = this.listofPantSizes.filter((item) => {
            return item >= this.malePantMin && item <= this.malePantMax;
          });
        } else {
          this.PantSizes = this.listofPantSizes.filter((item) => {
            return item >= this.femalePantMin && item <= this.femalePantMax;
          });
        }
      }
    });

    this.appService.getFieldAvailableOptions('field_shirt_size_from').subscribe(res => {
      const response: any = res;
      this.listofShirtSizes = Object.keys(response.settings.allowed_values);
      localStorage.setItem('listofShirtSizes', JSON.stringify(this.listofShirtSizes));
      if (this.showChildrenSizes) {
        this.ShirtSizes = this.listofShirtSizes.filter((item) => {
          return item >= this.childShirtMin && item <= this.childShirtMax;
        });
      } else {
        if (this.adminService.userData[0].field_gender_export == '1') {
          this.ShirtSizes = this.listofShirtSizes.filter((item) => {
            return item >= this.maleShirtMin && item <= this.maleShirtMax;
          });
        } else {
          this.ShirtSizes = this.listofShirtSizes.filter((item) => {
            return item >= this.femaleShirtMin && item <= this.femaleShirtMax;
          });
        }
      }
    });

    this.appService.getFieldAvailableOptions('field_shoe_size_from').subscribe(res => {
      const response: any = res;
      this.listofShoeSizes = Object.keys(response.settings.allowed_values);
      localStorage.setItem('listofShoeSizes', JSON.stringify(this.listofShoeSizes));
      if (this.showChildrenSizes) {
        this.ShoeSizes = this.listofShoeSizes.filter((item) => {
          return item >= this.childShoeMin && item <= this.childShoeMax;
        });
      } else {
        if (this.adminService.userData[0].field_gender_export == '1') {
          this.ShoeSizes = this.listofShoeSizes.filter((item) => {
            return item >= this.maleShoeMin && item <= this.maleShoeMax;
          });
        } else {
          this.ShoeSizes = this.listofShoeSizes.filter((item) => {
            return item >= this.femaleShoeMin && item <= this.femaleShoeMax;
          });
        }
      }
    });
  }
  childrenSizes() {
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
      if (this.adminService.userData[0].field_gender_export == '1') {
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


  openUserInfo(uid, type) {
    this.userprofileService.loadProfile(uid).subscribe(res => {
      const response: any = res;
      this.adminService.userData = response;
      this.adminService.showListComponent = false;
    });
    switch (type) {
      case 'info':
      default:
        this.adminService.showInfoComponent = true;
        break;

      case 'media':
        this.adminService.showMediaComponent = true;
        break;
    }
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  displayCheck(row) {
    return true;
  }
  onActivate(event) {
    // // console.log('Activate Event', event);
  }
  setStatus(uid, status) {
    this.userprofileService.setUserStatus(uid, status).subscribe(res => {
      // this.fetchListData(this.viewType);
      this.fetchUserDataforList(uid);
    });
  }
  fetchUserDataforList(uid) {
    uid = Number(uid);
    this.userprofileService.adminList(uid).subscribe(res => {
      const response: any = res;

      const id = response[0].uid;
      const index = this.rows.findIndex(item => item.uid === id);

      // Replace the item by index.
      this.rows.splice(index, 1, response[0]);
      // To check.
      // console.log(this.rows);
      this.updated = Date.now().toString();
    });
  }
  fetchListData(type = 'all') {
    this.viewType = type;
    this.loadingIndicator = true;
    this.userprofileService.adminList(type).subscribe(res => {
        const response: any = res;
        this.temp = [...response];
        this.rows = response;
        this.loadingIndicator = false;
        this.messages.emptyMessage = 'No results';
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const field = event.target.name;
    // filter our data
    const temp = this.temp.filter((d) => {
      return d[field].toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
    if (this.rows.length === 0) {
      this.messages.emptyMessage = 'No results';
    }
  }

  toggleView(event) {
    const val = event.target.value.toLowerCase();
    let temp = this.temp;
    this.currentView = [];
    this.currentView.push(val);
    this.viewType = val;
    // filter our data
    if (val !== 'all') {
      temp = this.temp.filter((d) => {
        return d.field_profile_status.toLowerCase().indexOf(val) !== -1 || !val;
      });
    }
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
    if (this.rows.length === 0) {
      this.messages.emptyMessage = 'No results';
    }
  }
  onSelectRed(row) {
    // console.log(row);
  }

  onSelectBlue(value) {
    // console.log(value);
  }


}
