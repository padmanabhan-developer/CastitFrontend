import { UserprofileService } from 'src/app/services/userprofile.service';
import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../services/app-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {
  profileData: any;
  userId: any;
  defaultImage: string;
  profileFallback: string;
  showVideo: boolean;
  showImage: boolean;
  loadedAssetUrl = 'assets/images/thumb4.png';
  assignedCategories = '';
  assignedSkills = '';
  assignedLicenses = '';
  constructor(
    public appService: AppDataService,
    public userprofileService: UserprofileService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.defaultImage = this.appService.defaultImage;
    this.profileFallback = this.appService.profileFallback;
    this.userId = this.route.snapshot.paramMap.get('id');
    this.appService.getSingleProfile(this.userId).subscribe((res) => {
      this.profileData = res[0];
      for (const item of this.profileData.field_category_export) {
        this.assignedCategories += JSON.parse(localStorage.getItem(this.appService.langcode + '-' + 'field_category'))[item] + ', ';
      }
      this.assignedCategories = this.assignedCategories.substr(0, this.assignedCategories.length - 2);

      for (const item of this.profileData.field_skills_export) {
        this.assignedSkills += JSON.parse(localStorage.getItem(this.appService.langcode + '-' + 'field_skills'))[item] + ', ';
      }
      this.assignedSkills = this.assignedSkills.substr(0, this.assignedSkills.length - 2);

      for (const item of this.profileData.field_licenses_export) {
        this.assignedLicenses += JSON.parse(localStorage.getItem(this.appService.langcode + '-' + 'field_licenses'))[item] + ', ';
      }
      this.assignedLicenses = this.assignedLicenses.substr(0, this.assignedLicenses.length - 2);

      if (res[0] && res[0].field_photos_export && res[0].field_photos_export[0] ) {
        this.appService.addToLightboxImage = res[0].field_photos_export[0];
        this.showImage = true;
        this.loadedAssetUrl = this.profileData.field_photos_export[0];
      }
    });
  }
  getEyeColor(id) {
    let colors: any = localStorage.getItem(this.appService.langcode + '-' + 'field_eye_color');
    colors = JSON.parse(colors);
    return colors[id];
  }
  getHairColor(id) {
    let colors: any = localStorage.getItem(this.appService.langcode + '-' + 'field_hair_color');
    colors = JSON.parse(colors);
    return colors[id];
  }
  getLangName(id) {
    let languages: any = localStorage.getItem(this.appService.langcode + '-' + 'field_language_one');
    languages = JSON.parse(languages);
    return languages[id];
  }
  closeDetails() {
    if (this.appService.profileOpened && false) {
      this.appService.profileOpened = false;
      this.appService.sidebarOpened = true;
    } else {
      this.router.navigate(['/profiles']);
    }
  }
  loadAsset(index, assetType) {
    switch (assetType) {
      case 'image':
        this.showVideo = false;
        this.showImage = true;
        this.loadedAssetUrl = this.profileData.field_photos_export[index];
        break;

      case 'video':
        this.showImage = false;
        this.showVideo = true;
        this.loadedAssetUrl = this.profileData.field_videos_export[index];
        break;

      default:
        break;
    }
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
