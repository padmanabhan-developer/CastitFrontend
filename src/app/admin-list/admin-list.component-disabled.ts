// import { AdminService } from './../services/admin.service';
// import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
// import { AppDataService } from '../services/app-data.service';
// import { UserprofileService } from '../services/userprofile.service';
// import { Router, provideRoutes } from '@angular/router';
// import { DatatableComponent } from '@swimlane/ngx-datatable';
// import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';

// @Component({
//   selector: 'app-admin-list',
//   templateUrl: './admin-list.component.html',
//   styleUrls: ['./admin-list.component.scss'],
//   // encapsulation: ViewEncapsulation.ShadowDom
// })
// export class AdminListComponent implements OnInit {
//   listData: any[];
//   SelectionType = SelectionType;
//   rows = [];
//   temp = [];
//   statusTemplate: TemplateRef<any> ;
//   updated = Date.now().toString();
//   listOfCountries: any;
//   listOfCountryIDs: any;
//   listOfCountryNames: any;
//   info: string;
//   listofShirtSizes: any;
//   listofPantSizes: any;
//   listofSuitSizes: any;
//   listofShoeSizes: any;
//   listofHairColors: any;
//   listofEyeColors: any;
//   listOfSkills: any;
//   listOfSkillIDs: any;
//   listOfSkillNames: any;
//   listOfCategories: any;
//   listOfCategoryIDs: any;
//   listOfCategoryNames: any;
//   listOfLicenses: any;
//   listOfLicenseIDs: any;
//   listOfLicenseNames: any;
//   listOfLanguages: any;
//   listOfLanguageIDs: any;
//   listOfLanguageNames: any;
//   day: number;
//   month: number;
//   year: number;
//   showChildrenSizes = false;

//   maleShirtMin = 35;
//   maleShirtMax = 46;
//   femaleShirtMin = 32;
//   femaleShirtMax = 58;
//   childShirtMin = 86;
//   childShirtMax = 170;

//   malePantMin = 26;
//   malePantMax = 42;
//   femalePantMin = 32;
//   femalePantMax = 58;
//   childPantMin = 86;
//   childPantMax = 170;

//   maleShoeMin = 34;
//   maleShoeMax = 55;
//   femaleShoeMin = 34;
//   femaleShoeMax = 48;
//   childShoeMin = 17;
//   childShoeMax = 42;
//   PantSizes: any;
//   ShirtSizes: any;
//   ShoeSizes: any;
//   columns = [
//     // {
//     //   prop: 'selected',
//     //   name: '',
//     //   sortable: false,
//     //   canAutoResize: false,
//     //   draggable: false,
//     //   resizable: false,
//     //   headerCheckboxable: true,
//     //   checkboxable: true,
//     //   width: 30
//     // },
//     { prop: 'field_first_name', name: 'First Name' },
//     { prop: 'field_last_name', name: 'Last Name' },
//     { prop: 'field_profile_number', name: 'Profile Number' },
//     { prop: 'created', name: 'Created' },
//     { prop: 'updated', name: 'Updated' },
//     // { prop: 'field_profile_status', name: 'Status' },
//     { prop: 'status', name: 'Status', sortable: false },
//     { prop: 'info_link', name: 'View Profile', sortable: false},
//     { prop: 'media_link', name: 'View Media', sortable: false}
//   ];
//   @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
//   ColumnMode = ColumnMode;
//   selected = [];
//   currentView = ['all'];
//   loadingIndicator = false;
//   messages = {
//     emptyMessage: 'Trying to fetch data ... ', // Message to show when array is presented, but contains no values
//     totalMessage: 'total', // Footer total message
//     selectedMessage: 'selected' // Footer selected message
//   };
//   viewType: string;

//   userData: any;
//   constructor(
//     public appService: AppDataService,
//     public userprofileService: UserprofileService,
//     public adminService: AdminService,
//     private router: Router
//   ) { }

//   ngOnInit() {
//     this.fetchListData();
//     this.toggleOptions();

//     this.appService.getFieldAvailableOptions('field_country').subscribe(res => {
//       const respose: any = res;
//       this.listOfCountries = respose.settings.allowed_values;
//       this.listOfCountryIDs = Object.keys(this.listOfCountries);
//       this.listOfCountryNames = Object.values(this.listOfCountries);
//       localStorage.setItem('listOfCountryIDs', JSON.stringify(this.listOfCountryIDs));
//       localStorage.setItem('listOfCountryNames', JSON.stringify(this.listOfCountryNames));
//     }); 
//     this.appService.getFieldAvailableOptions('field_shirt_size_from').subscribe(res => {
//       const respose: any = res;
//       this.listofShirtSizes = Object.keys(respose.settings.allowed_values);
//       localStorage.setItem('listofShirtSizes', JSON.stringify(this.listofShirtSizes));
//     }); 
//     this.appService.getFieldAvailableOptions('field_pant_size_from').subscribe(res => {
//       const respose: any = res;
//       this.listofPantSizes = Object.keys(respose.settings.allowed_values);
//       localStorage.setItem('listofPantSizes', JSON.stringify(this.listofPantSizes));
//     }); 
//     this.appService.getFieldAvailableOptions('field_suit_size_from').subscribe(res => {
//       const respose: any = res;
//       this.listofSuitSizes = Object.keys(respose.settings.allowed_values);
//       localStorage.setItem('listofSuitSizes', JSON.stringify(this.listofSuitSizes));
//     }); 
//     this.appService.getFieldAvailableOptions('field_shoe_size_from').subscribe(res => {
//       const respose: any = res;
//       this.listofShoeSizes = Object.keys(respose.settings.allowed_values);
//       localStorage.setItem('listofShoeSizes', JSON.stringify(this.listofShoeSizes));
//     });
//     this.appService.getFieldAvailableOptions('field_hair_color').subscribe(res => {
//       const respose: any = res;
//       this.listofHairColors = Object.values(respose.settings.allowed_values);
//       localStorage.setItem('listofHairColors', JSON.stringify(this.listofHairColors));
//     });
//     this.appService.getFieldAvailableOptions('field_eye_color').subscribe(res => {
//       const respose: any = res;
//       console.log(res);
//       this.listofEyeColors = Object.values(respose.settings.allowed_values);
//       localStorage.setItem('listofEyeColors', JSON.stringify(this.listofEyeColors));
//     });
//     this.appService.getFieldAvailableOptions('field_skills').subscribe(res => {
//       const respose: any = res;
//       this.listOfSkills = respose.settings.allowed_values;
//       this.listOfSkillIDs = Object.keys(this.listOfSkills);
//       this.listOfSkillNames = Object.values(this.listOfSkills);
//       localStorage.setItem('listOfSkillIDs', JSON.stringify(this.listOfSkillIDs));
//       localStorage.setItem('listOfSkillNames', JSON.stringify(this.listOfSkillNames));
//     });
//     this.appService.getFieldAvailableOptions('field_category').subscribe(res => {
//       const respose: any = res;
//       this.listOfCategories = respose.settings.allowed_values;
//       this.listOfCategoryIDs = Object.keys(this.listOfCategories);
//       this.listOfCategoryNames = Object.values(this.listOfCategories);
//       localStorage.setItem('listOfCategoryIDs', JSON.stringify(this.listOfCategoryIDs));
//       localStorage.setItem('listOfCategoryNames', JSON.stringify(this.listOfCategoryNames));
//     });
//     this.appService.getFieldAvailableOptions('field_licenses').subscribe(res => {
//       const respose: any = res;
//       this.listOfLicenses = respose.settings.allowed_values;
//       this.listOfLicenseIDs = Object.keys(this.listOfLicenses);
//       this.listOfLicenseNames = Object.values(this.listOfLicenses);
//       localStorage.setItem('listOfLicenseIDs', JSON.stringify(this.listOfLicenseIDs));
//       localStorage.setItem('listOfLicenseNames', JSON.stringify(this.listOfLicenseNames));
//     });
//     this.appService.getFieldAvailableOptions('field_language_one').subscribe(res => {
//       const respose: any = res;
//       this.listOfLanguages = respose.settings.allowed_values;
//       this.listOfLanguageIDs = Object.keys(this.listOfLanguages);
//       this.listOfLanguageNames = Object.values(this.listOfLanguages);
//       localStorage.setItem('listOfLanguageIDs', JSON.stringify(this.listOfLanguageIDs));
//       localStorage.setItem('listOfLanguageNames', JSON.stringify(this.listOfLanguageNames));
//     });
//     if (this.showChildrenSizes) {
//       this.PantSizes = this.listofPantSizes.filter((item) => {
//         return item >= this.childPantMin && item <= this.childPantMax;
//       });
//       this.ShirtSizes = this.listofShirtSizes.filter((item) => {
//         return item >= this.childShirtMin && item <= this.childShirtMax;
//       });
//       this.ShoeSizes = this.listofShoeSizes.filter((item) => {
//         return item >= this.childShoeMin && item <= this.childShoeMax;
//       });
//     } else {
//       if (this.adminService.userData.field_gender[0].value == '1') {
//         this.PantSizes = this.listofPantSizes.filter((item) => {
//           return item >= this.malePantMin && item <= this.malePantMax;
//         });
//         this.ShirtSizes = this.listofShirtSizes.filter((item) => {
//           return item >= this.maleShirtMin && item <= this.maleShirtMax;
//         });
//         this.ShoeSizes = this.listofShoeSizes.filter((item) => {
//           return item >= this.maleShoeMin && item <= this.maleShoeMax;
//         });
//       } else {
//         this.PantSizes = this.listofPantSizes.filter((item) => {
//           return item >= this.femalePantMin && item <= this.femalePantMax;
//         });
//         this.ShirtSizes = this.listofShirtSizes.filter((item) => {
//           return item >= this.femaleShirtMin && item <= this.femaleShirtMax;
//         });
//         this.ShoeSizes = this.listofShoeSizes.filter((item) => {
//           return item >= this.femaleShoeMin && item <= this.femaleShoeMax;
//         });
//       }
//     }
//   }
//   childrenSizes() {
//     console.log(this.showChildrenSizes);
//     this.toggleOptions();
//     return this.showChildrenSizes;
//   }
//   toggleOptions() {
//     if (this.showChildrenSizes) {
//       this.PantSizes = this.listofPantSizes.filter((item) => {
//         return item >= this.childPantMin && item <= this.childPantMax;
//       });
//       this.ShirtSizes = this.listofShirtSizes.filter((item) => {
//         return item >= this.childShirtMin && item <= this.childShirtMax;
//       });
//       this.ShoeSizes = this.listofShoeSizes.filter((item) => {
//         return item >= this.childShoeMin && item <= this.childShoeMax;
//       });
//     } else {
//       if (this.adminService.userData.field_gender[0].value == '1') {
//         this.PantSizes = this.listofPantSizes.filter((item) => {
//           return item >= this.malePantMin && item <= this.malePantMax;
//         });
//         this.ShirtSizes = this.listofShirtSizes.filter((item) => {
//           return item >= this.maleShirtMin && item <= this.maleShirtMax;
//         });
//         this.ShoeSizes = this.listofShoeSizes.filter((item) => {
//           return item >= this.maleShoeMin && item <= this.maleShoeMax;
//         });
//       } else {
//         this.PantSizes = this.listofPantSizes.filter((item) => {
//           return item >= this.femalePantMin && item <= this.femalePantMax;
//         });
//         this.ShirtSizes = this.listofShirtSizes.filter((item) => {
//           return item >= this.femaleShirtMin && item <= this.femaleShirtMax;
//         });
//         this.ShoeSizes = this.listofShoeSizes.filter((item) => {
//           return item >= this.femaleShoeMin && item <= this.femaleShoeMax;
//         });
//       }
//     }
//   }


//   openUserInfo(uid, type) {
//     switch (type) {
//       case 'info':
//       default:
//         this.adminService.loadProfile(uid).subscribe(res => {
//           const response: any = res;
//           Object.assign(this.adminService.userData, response[0]);
//           for (const prop in this.adminService.userData) {
//             if (Object.prototype.hasOwnProperty.call(this.adminService.userData, prop)) {
//               if (Array.isArray(this.adminService.userData[prop])) {
//                 if (prop === 'field_payments') {
//                   for (const [index,item] of this.adminService.userData[prop].entries()) {
//                     this.adminService.userData[prop][index].data = JSON.parse(item.data);
//                   }
//                 }
//                 if (this.adminService.userData[prop].length === 0) {
//                   this.adminService.userData[prop] = [{value: ''}];
//                   if (prop === 'field_telephone') {
//                     this.adminService.userData[prop] = [{value: ''}, {value: ''}];
//                   }
//                 }
//                 if (this.adminService.userData[prop].length === 1) {
//                   if (prop === 'field_telephone') {
//                     this.adminService.userData[prop][1] = {value: ''};
//                   }
//                 }
//               }
//             }
//           }
//           this.adminService.showInfoComponent = true;
//           console.log(this.adminService.userData);
//         });
//         break;

//       case 'media':
//         this.adminService.showMediaComponent = true;
//         break;
//     }
//   }
//   onSelect({ selected }) {
//     // console.log('Select Event', selected, this.selected);

//     this.selected.splice(0, this.selected.length);
//     this.selected.push(...selected);
//   }
//   displayCheck(row) {
//     return true;
//   }
//   onActivate(event) {
//     // // console.log('Activate Event', event);
//   }
//   setStatus(uid, status) {
//     this.userprofileService.setUserStatus(uid, status).subscribe(res => {
//       // this.fetchListData(this.viewType);
//       this.fetchUserDataforList(uid);
//     });
//   }
//   fetchUserDataforList(uid) {
//     uid = Number(uid);
//     this.userprofileService.adminList(uid).subscribe(res => {
//       const response: any = res;

//       const id = response[0].uid;
//       const index = this.rows.findIndex(item => item.uid === id);

//       // Replace the item by index.
//       this.rows.splice(index, 1, response[0]);
//       // To check.
//       // console.log(this.rows);
//       this.updated = Date.now().toString();
//     });
//   }
//   fetchListData(type = 'all') {
//     this.viewType = type;
//     this.loadingIndicator = true;
//     this.userprofileService.adminList(type).subscribe(res => {
//         const response: any = res;
//         this.temp = [...response];
//         this.rows = response;
//         this.loadingIndicator = false;
//         this.messages.emptyMessage = 'No results';
//     });
//   }

//   updateFilter(event) {
//     const val = event.target.value.toLowerCase();
//     const field = event.target.name;
//     // filter our data
//     const temp = this.temp.filter((d) => {
//       return d[field].toLowerCase().indexOf(val) !== -1 || !val;
//     });

//     // update the rows
//     this.rows = temp;
//     // Whenever the filter changes, always go back to the first page
//     this.table.offset = 0;
//     if (this.rows.length === 0) {
//       this.messages.emptyMessage = 'No results';
//     }
//   }

//   toggleView(event) {
//     const val = event.target.value.toLowerCase();
//     let temp = this.temp;
//     this.currentView = [];
//     this.currentView.push(val);
//     this.viewType = val;
//     // filter our data
//     if (val !== 'all') {
//       temp = this.temp.filter((d) => {
//         return d.field_profile_status.toLowerCase().indexOf(val) !== -1 || !val;
//       });
//     }
//     // update the rows
//     this.rows = temp;
//     // Whenever the filter changes, always go back to the first page
//     this.table.offset = 0;
//     if (this.rows.length === 0) {
//       this.messages.emptyMessage = 'No results';
//     }
//   }
//   onSelectRed(row) {
//     // console.log(row);
//   }

//   onSelectBlue(value) {
//     // console.log(value);
//   }


// }
