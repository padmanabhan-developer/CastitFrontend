import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppDataService } from '../services/app-data.service';
import { UserprofileService } from '../services/userprofile.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-user-media',
  templateUrl: './admin-user-media.component.html',
  styleUrls: ['./admin-user-media.component.scss']
})
export class AdminUserMediaComponent implements OnInit, OnDestroy {
  loadedAssetUrl = 'assets/images/thumb4.png';
  defaultImage = this.appService.defaultImage;
  profileFallback = this.appService.profileFallback;
  photoStatus = [];
  videoStatus = [];
  photoStatusFromAPI: string[];
  videoStatusFromAPI: string[];
  fileToUpload: File = null;
  timeinstant: number;
  loaderImage = '/assets/images/loader/PolygonLoader.svg';
  loadSpinner = false;
  mySubscription: any;
  constructor(
    public appService: AppDataService,
    public userprofileService: UserprofileService,
    public adminService: AdminService,
    public router: Router
  ) {
      this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
      };
      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = false;
        }
      });
  }

  ngOnInit() {
    if (!this.adminService.userData[0].uid_export) {
      
    } else {
      this.loadMediaData();
    }
  }

  loadMediaData() {
    this.photoStatusFromAPI = this.adminService.userData[0].field_photos.replace(' ', '').split(',');
    this.photoStatusFromAPI.forEach((str, idx) => {
      if ((str.trim() === 'online') || (str.trim() === '')) {
        this.photoStatus[idx] = true;
      } else {
        this.photoStatus[idx] = false;
      }
    });

    this.videoStatusFromAPI = this.adminService.userData[0].field_videos.replace(' ', '').split(',');
    this.videoStatusFromAPI.forEach((str, idx) => {
      if ((str.trim() === 'online') || (str.trim() === '')) {
        this.videoStatus[idx] = true;
      } else {
        this.videoStatus[idx] = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  openModal() {
    alert('Code refactoring in progress');
  }
  currentSlide(gid) {
    alert('Code refactoring in progress');
  }
  openUploadModal() {
    alert('Code refactoring in progress');
  }
  changeMediaStatus(checked, type, index) {
    let status = checked ? 'online' : 'offline';
    if (checked === 'deleted') {
      status = 'deleted';
    }
    const uid = this.adminService.userData[0].uid_export;

    if (uid && type && index >= 0 && status) {
      this.adminService.updateMediaStatus(uid, type, index, status).subscribe(res => {
        const response: any = res;
      });
    }
  }
  handleFileInput(files: FileList) {
    this.loadSpinner = true;
    this.fileToUpload = files.item(0);
    this.timeinstant = Date.now();
    const filename = this.timeinstant + '__' + this.fileToUpload.name.replace(/[^a-zA-Z0-9]/g, '');
    const filetype = this.fileToUpload.type;
    const filesize = this.fileToUpload.size;
    this.appService.getCloudTempUrl(filename).subscribe( res => {
      const response: any = res;
      this.appService.cloudFilesTempUrl = response.tempUrl;
      this.uploadFileToActivity(filename);
    });
  }

  uploadFileToActivity(filename) {
    this.appService.postFile(this.fileToUpload, filename).subscribe(res => {
      this.loadSpinner = false;
      if (this.fileToUpload.type.includes('video')) {
        this.appService.initiateZencoder(filename).subscribe(res => {
          const linkToUploadedVideoFile = this.appService.castitFilesCDN + filename + '.mp4';
          const linkToThumbnail = this.appService.castitFilesCDN + 'thumb_' + filename + '.png';
          this.adminService.userData[0].field_video_thumbnails_export.push(linkToThumbnail);
          this.adminService.userData[0].field_videos_export.push(linkToUploadedVideoFile);
          // localStorage.setItem('currentUserProfile', JSON.stringify(this.adminService.userData));
        });
      } else {
        const linkToImageFile = this.appService.castitFilesCDN + filename;
        this.adminService.userData[0].field_photos_export.push(linkToImageFile);
        // localStorage.setItem('currentUserProfile', JSON.stringify(this.adminService.userData));
      }
      console.log(this.adminService.userData[0]);
      this.saveUser();
    }, error => {
        console.log(error);
      });
  }
  saveUser(role = 'model') {
    this.adminService.saveProfile(role, this.adminService.userData[0]).subscribe((res) => {
      const response: any = res;
      if (response && response.message && response.message === 'create success' ||
          response && response.message && response.message === 'update success') {
        this.adminService.userData[0].uid_export = response.uid;
      }
    });
  }

}
