import { Component, OnInit, Input } from '@angular/core';
import { AppDataService } from '../services/app-data.service';
import { UserprofileService } from '../services/userprofile.service';

@Component({
  selector: 'app-addtolightbox',
  templateUrl: './addtolightbox.component.html',
  styleUrls: ['./addtolightbox.component.scss']
})
export class AddtolightboxComponent implements OnInit {
  lightboxesOfCurrentUser: any;
  selectedLightboxes = [];
  constructor(
    public appService: AppDataService,
    public userprofileService: UserprofileService,
  ) { }

  ngOnInit() {
    this.loadLightboxes();
    this.userprofileService.commentForModelInLightbox = '';
  }
  loadLightboxes() {
    this.userprofileService.loadGroupsOfCustomer().subscribe(res => {
      const response = res;
      this.lightboxesOfCurrentUser = response;
      this.userprofileService.lightboxesOfCurrentUser = this.lightboxesOfCurrentUser;
      // console.log(this.lightboxesOfCurrentUser);
    });
  }
  toggleLightboxSelection(gid) {
    if (!this.selectedLightboxes.includes(gid)) {
      this.selectedLightboxes.push(gid);
    } else {
      const newSelections = this.selectedLightboxes.filter((value) => {
        return value !== gid;
      });
      this.selectedLightboxes = newSelections;
    }
  }
  addLightbox() {
    if ( this.userprofileService.newLightboxName ) {
      this.userprofileService.addLightbox().subscribe(res => {
        this.loadLightboxes();
      });
    }
  }

}
