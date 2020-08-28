import { UserprofileService } from 'src/app/services/userprofile.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../services/app-data.service';

@Component({
  selector: 'app-hompage',
  templateUrl: './hompage.component.html',
  styleUrls: ['./hompage.component.css']
})
export class HompageComponent implements OnInit {
  data: any = [];
  defaultImage = '/assets/images/loader/PolygonLoader.svg';
  profileFallback = '/assets/images/profile/profileFallback.jpg';
  myProfileLink = '/login/1';
  searchGender: any = 'all';
  searchFN: any = '';
  lightboxMode = false;
  lightboxID = '';
  ageFrom: any;
  ageTo: any;
  emptyResults = false;
  queryParams: any;
  dobMin: any;
  dobMax: any;
  searchPerformed = false;
  searchPN: string;

  constructor(
    public appService: AppDataService,
    public userprofileService: UserprofileService,
    private router: Router,
    private currentRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.setMyprofileLink();
    this.defaultImage = this.appService.defaultImage;
    this.profileFallback = this.appService.profileFallback;
    // this.lightboxID = this.currentRoute.params
    this.queryParams = this.currentRoute.queryParams.subscribe(params => {
      if (params.fn) {
        this.searchFN = params.fn;
        this.searchPerformed = true;
      }
      if (params.pn) {
        this.searchFN = params.fn;
        this.searchPerformed = true;
      }
      if (params.gender) {
        this.searchGender = params.gender;
        this.searchPerformed = true;
      }
      if (params.dobMin) {
        this.dobMin = params.dobMin;
        this.searchPerformed = true;
      }
      if (params.dobMax) {
        this.dobMax = params.dobMax;
        this.searchPerformed = true;
      }
    });
    if (this.searchPerformed) {
      this.submitSearch();
    } else {
      this.loadTiles();
    }
  }

  loadTiles() {
    this.appService.getCProfiles().subscribe(res => {
      this.data = res;
      // this.data = this.shuffle(this.data);
      this.appService.loadedProfileData = this.data;

      this.appService.getYProfiles().subscribe(resp => {
        let yData = resp;
        // yData = this.shuffle(yData);
        this.appService.loadedProfileData = this.appService.loadedProfileData.concat(yData);
        this.data = this.appService.loadedProfileData;

        if (this.data.length < 1) {
          this.emptyResults = true;
        } else {
          this.emptyResults = false;
        }
      });
    });
  }

  getThumb(item) {
    console.log('item',item);
    if (item.field_photo_thumbnails_export && item.field_photo_thumbnails_export[0]) {
      return item.field_photo_thumbnails_export[0];
    } else if (item.field_photos_export && item.field_photo_export[0]) {
      return item.field_photo_export[0];
    } else {
      return this.profileFallback;
    }
  }

  toggleMobileMenu() {

  }

  setMyprofileLink() {
    if (
      this.userprofileService &&
      this.userprofileService.userProfile &&
      this.userprofileService.userProfile[0] &&
      this.userprofileService.userProfile[0].roles_target_id &&
      this.userprofileService.userProfile[0].roles_target_id.toLowerCase() === 'customer') {
        this.myProfileLink = '/customer-profile';
        // console.log('here');
      }
    // console.log(this.myProfileLink);
  }

  shuffle(arra1) {
    var ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
  }

  loadProfile(id) {
    this.appService.getSingleProfile(id);
    this.router.navigate(['/details', id]);
    // this.router.navigate(['/details']);
  }
  setGender(id) {
    if (this.searchGender === id && 0) {
      this.searchGender = 'all';
    } else {
      this.searchGender = id;
    }
  }

  resetSearch() {
    this.searchFN = '';
    this.searchPN = '';
    this.ageFrom = '';
    this.ageTo = '';
    this.searchGender = 'all';
    this.emptyResults = false;
    this.router.navigate(['profiles']);
    this.loadTiles();
  }

  getTimePeriod(ageFrom, ageTo) {
    const secondsInAMinute = 60;
    const minutesInAnHour = 60;
    const hoursInADay = 24;
    const daysInAYear = 365.25;

    const currentTimestamp = Date.now() / 1000;
    const startTimestamp = currentTimestamp - ageFrom * secondsInAMinute * minutesInAnHour * hoursInADay * daysInAYear;
    const EndTimestamp = currentTimestamp - ageTo * secondsInAMinute * minutesInAnHour * hoursInADay * daysInAYear;
  }
  getDatePeriod(ageFrom, ageTo) {

  }

  submitSearch(trigger = 'auto') {
    this.searchPerformed = (trigger === 'manual') ? false : true;
    let searchCriteria = '?dummy=0';
    if (this.searchGender !== 'all') {
      searchCriteria += '&gender=' + this.searchGender;
    }
    if (this.searchFN !== '') {
      if ((this.searchFN[0].toLowerCase() === 'c' || this.searchFN[0].toLowerCase() === 'y') &&
          (this.searchFN[1].toLowerCase() === 'm' || this.searchFN[1].toLowerCase() === 'f') &&
          (!isNaN(this.searchFN[2]))
        ) {
          this.searchPN = this.searchFN;
          searchCriteria += '&pn=' + this.searchPN;
      } else {
        searchCriteria += '&fn=' + this.searchFN;
      }
    }
    if (this.ageFrom && this.ageTo && (this.ageFrom !== this.ageTo)) { // both values are provided and are different
      const currentDateObj = new Date();
      const currentYear = currentDateObj.getFullYear();
      const currentDate = currentDateObj.toISOString().substring(0, 10);

      const yearOne = currentYear - this.ageFrom;
      const yearTwo = currentYear - this.ageTo;
      const yearMin = (yearOne <= yearTwo) ? yearOne : yearTwo;
      const yearMax = (yearOne >= yearTwo) ? yearOne : yearTwo;

      this.dobMin = currentDate.replace(currentYear.toString(), yearMin.toString());
      this.dobMax = currentDate.replace(currentYear.toString(), yearMax.toString());
      searchCriteria += '&dob_min=' + this.dobMin + '&dob_max=' + this.dobMax;

    } else if (this.ageFrom && this.ageTo && (this.ageFrom === this.ageTo)) { // both values are identical
      const currentDateObj = new Date();
      const currentYear = currentDateObj.getFullYear();
      const currentDate = currentDateObj.toISOString().substring(0, 10);

      const yearMin = currentYear - this.ageFrom;
      const yearMax = yearMin + 1;
      this.dobMin = currentDate.replace(currentYear.toString(), yearMin.toString());
      this.dobMax = currentDate.replace(currentYear.toString(), yearMax.toString());
      searchCriteria += '&dob_min=' + this.dobMin + '&dob_max=' + this.dobMax;

    } else if (!this.ageFrom && this.ageTo) { // Only TO value provided
      const currentDateObj = new Date();
      const currentYear = currentDateObj.getFullYear();
      const currentDate = currentDateObj.toISOString().substring(0, 10);

      const yearMin = currentYear - this.ageTo;
      const yearMax = currentYear;

      this.dobMin = currentDate.replace(currentYear.toString(), yearMin.toString());
      this.dobMax = currentDate.replace(currentYear.toString(), yearMax.toString());
      searchCriteria += '&dob_min=' + this.dobMin + '&dob_max=' + this.dobMax;

    } else if (this.ageFrom && !this.ageTo) { // Only FROM value provided
      const currentDateObj = new Date();
      const currentYear = currentDateObj.getFullYear();
      const currentDate = currentDateObj.toISOString().substring(0, 10);

      const yearMin = currentYear - 200; // assuming maximum age possible is 200
      const yearMax = currentYear - this.ageFrom;

      this.dobMin = currentDate.replace(currentYear.toString(), yearMin.toString());
      this.dobMax = currentDate.replace(currentYear.toString(), yearMax.toString());
      searchCriteria += '&dob_min=' + this.dobMin + '&dob_max=' + this.dobMax;
    }
    if (searchCriteria === '?dummy=0'){
      searchCriteria = '';
    }
    if (!this.searchPerformed) {
      this.router.navigate(['profiles'], { queryParams: { fn: this.searchFN, pn: this.searchPN, dobMin: this.dobMin, dobMax: this.dobMax, gender: this.searchGender } });
    }
    this.appService.getProfiles(searchCriteria)
      .subscribe(res => {
        this.data = res;
        this.appService.loadedProfileData = this.data;
        if (this.data.length < 1){
          this.emptyResults = true;
        } else {
          this.emptyResults = false;
        }
      });
  }

  addModelToLightbox(model) {
    if (! this.userprofileService.checkIfCustomer()) {
      this.router.navigate(['/customer-login']);
    } else {
      this.appService.addToLightboxImage = model.field_photo_thumbnails_export[0] ? model.field_photo_thumbnails_export[0] : '';
      this.userprofileService.showAddToLightboxComponent = true;
      this.userprofileService.modelToBeAddedToLightbox = model;
    }

  }
}
