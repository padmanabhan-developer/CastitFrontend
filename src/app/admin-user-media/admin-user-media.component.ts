import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../services/app-data.service';
import { UserprofileService } from '../services/userprofile.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-user-media',
  templateUrl: './admin-user-media.component.html',
  styleUrls: ['./admin-user-media.component.scss']
})
export class AdminUserMediaComponent implements OnInit {
  loadedAssetUrl = 'assets/images/thumb4.png';
  defaultImage = this.appService.defaultImage;
  profileFallback = this.appService.profileFallback;
  photoStatus: any[];
  videoStatus: any[];

  constructor(
    public appService: AppDataService,
    public userprofileService: UserprofileService,
    public adminService: AdminService,
    // private router: Router
  ) { }

  ngOnInit() {
    this.photoStatus = [];
    this.videoStatus = [];
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

}
