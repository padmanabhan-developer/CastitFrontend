import { Component, OnInit } from '@angular/core';
import { UserprofileService } from '../services/userprofile.service';
import { AppDataService } from '../services/app-data.service';

@Component({
  selector: 'app-customerprofile',
  templateUrl: './customerprofile.component.html',
  styleUrls: ['./customerprofile.component.scss']
})
export class CustomerprofileComponent implements OnInit {
  lightboxesOfCurrentUser: any;
  initiateDeleteLightbox = false;
  newLightboxName: string;
  lightboxToBeDeleted = {
    id: '',
    name: ''
  };
  initiateAddLightbox = false;
  constructor(
    public userprofileService: UserprofileService,
    private appData: AppDataService,
  ) { }

  ngOnInit() {
    this.loadLightboxes();
  }
  loadLightboxes() {
    this.userprofileService.loadGroupsOfCustomer().subscribe(res => {
      const response = res;
      this.lightboxesOfCurrentUser = response;
      this.userprofileService.lightboxesOfCurrentUser = this.lightboxesOfCurrentUser;
      // console.log(this.lightboxesOfCurrentUser);
    });
  }
  addLightboxInitiate() {
    this.initiateAddLightbox = true;
  }
  addLightbox() {
    this.initiateAddLightbox = false;
    this.userprofileService.addLightbox().subscribe(res => {
      this.loadLightboxes();
    });
  }
  addLightboxCancel(){
    this.initiateAddLightbox = false;
  }
  removeLightboxInitiate(id, name) {
    this.initiateDeleteLightbox = true;
    this.lightboxToBeDeleted = { name, id };
  }
  removeLightboxCancel() {
    this.initiateDeleteLightbox = false;
    this.lightboxToBeDeleted = {
      id: '',
      name: ''
    };
  }
  removeLightbox(id) {
    this.initiateDeleteLightbox = false;
    this.userprofileService.removeLightbox(id).subscribe(res => {
      this.loadLightboxes();
    });
  }
  saveUser(role) {
    this.userprofileService.saveProfile(role).subscribe((res) => {
      const respose: any = res;
      if (respose && respose.message && respose.message === 'create success') {
        console.log('Profile updated');
      }
    });
  }
}
