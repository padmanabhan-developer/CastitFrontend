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
  searchFN = '';
  lightboxMode = false;
  lightboxID = '';

  constructor(
    public appService: AppDataService,
    public userprofileService: UserprofileService,
    private router: Router,
    // private currentRoute: ActivatedRouteSnapshot
  ) { }

  ngOnInit() {
    this.setMyprofileLink();
    this.defaultImage = this.appService.defaultImage;
    this.profileFallback = this.appService.profileFallback;
    // this.lightboxID = this.currentRoute.params.

    this.appService.getCProfiles().subscribe(res => {
        this.data = res;
        this.data = this.shuffle(this.data);
        this.appService.loadedProfileData = this.data;

        this.appService.getYProfiles().subscribe(resp => {
        let yData = resp;
        yData = this.shuffle(yData);
        this.appService.loadedProfileData = this.appService.loadedProfileData.concat(yData);
        this.data = this.appService.loadedProfileData;
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
        console.log('here');
      }
    console.log(this.myProfileLink);
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
    this.searchGender = id;
  }

  resetSearch() {
    this.appService.getProfiles()
    .subscribe(res => {
      this.data = res;
      this.appService.loadedProfileData = this.data;
    });
  }

  submitSearch() {
    let searchCriteria = '?dummy=0';
    if (this.searchGender !== 'all') {
      searchCriteria += '&gender=' + this.searchGender;
    }
    if (this.searchFN !== '') {
      searchCriteria += '&fn=' + this.searchFN;
    }
    if (searchCriteria === '?dummy=0'){
      searchCriteria = '';
    }
    this.appService.getProfiles(searchCriteria)
      .subscribe(res => {
        this.data = res;
        this.appService.loadedProfileData = this.data;
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
