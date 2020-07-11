import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../services/app-data.service';
import { UserprofileService } from '../services/userprofile.service';

@Component({
  selector: 'castit-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  myProfileLink = '/login/1';
  constructor(
    public appService: AppDataService,
    public userprofileService: UserprofileService,
  ) { }

  ngOnInit() {
    this.setMyprofileLink();
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
}