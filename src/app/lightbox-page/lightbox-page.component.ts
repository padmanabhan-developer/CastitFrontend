import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../services/app-data.service';
import { UserprofileService } from '../services/userprofile.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lightbox-page',
  templateUrl: './lightbox-page.component.html',
  styleUrls: ['./lightbox-page.component.scss']
})
export class LightboxPageComponent implements OnInit {
  data: any = [];
  defaultImage = '/assets/images/loader/PolygonLoader.svg';
  profileFallback = '/assets/images/profile/profileFallback.jpg';
  myProfileLink = '/login/1';
  lbid: any;
  constructor(
    public appService: AppDataService,
    public userprofileService: UserprofileService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.lbid = params.get('lbid');
      const gid = this.lbid;
      this.userprofileService.loadProfilesOfLightbox(gid).subscribe(res => {
        this.data = res;
        console.log(this.data);
      });
    });
  }

}
