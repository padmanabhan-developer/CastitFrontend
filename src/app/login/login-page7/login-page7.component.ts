import { UserprofileService } from 'src/app/services/userprofile.service';
import { Component, OnInit, Input } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { Router } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'login-page-7',
  templateUrl: './login-page7.component.html',
  styleUrls: ['./login-page7.component.scss']
})
export class LoginPage7Component implements OnInit {
  @Input() showHeader = true;
  fileToUpload: File = null;
  timeinstant: number;
  loaderImage = '/assets/images/loader/PolygonLoader.svg';
  loadSpinner = false;
  constructor(
    private appService: AppDataService,
    public userprofileService: UserprofileService,
    private router: Router) { }
  ngOnInit() {
    localStorage.setItem('currentUserProfile', JSON.stringify(this.userprofileService.userProfile));
  }

  handleFileInput(files: FileList) {
    this.loadSpinner = true;
    this.fileToUpload = files.item(0);
    this.timeinstant = Date.now();
    const filename = this.timeinstant + '__' + this.fileToUpload.name.replace(/[^a-zA-Z0-9]/g, '');
    const filetype = this.fileToUpload.type;
    const filesize = this.fileToUpload.size;
    this.appService.getCloudTempUrl(filename).subscribe( res => {
      const respose: any = res;
      this.appService.cloudFilesTempUrl = respose.tempUrl;
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

          this.userprofileService.userProfile[0].field_video_thumbnails_export.push(linkToThumbnail);
          this.userprofileService.userProfile[0].field_videos_export.push(linkToUploadedVideoFile);
          localStorage.setItem('currentUserProfile', JSON.stringify(this.userprofileService.userProfile));
        });
      } else {
        const linkToImageFile = this.appService.castitFilesCDN + filename;
        this.userprofileService.userProfile[0].field_photos_export.push(linkToImageFile);
        localStorage.setItem('currentUserProfile', JSON.stringify(this.userprofileService.userProfile));
      }
      console.log(this.userprofileService.userProfile[0]);
    }, error => {
        console.log(error);
      });
  }

  saveMedia() {
    this.userprofileService.saveProfile().subscribe((res) => {
      const respose: any = res;
      if (respose && respose.message && respose.message === 'update success') {
        this.router.navigate(['/profiles']);
      }
    });
  }

  refreshVideoThumb(src){
    console.log('err', src);
    alert('Refreshing Video Thumbnails; Please wait');
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }
}
