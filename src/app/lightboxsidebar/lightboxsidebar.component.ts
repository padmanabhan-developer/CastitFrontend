import { Component, OnInit, Input } from '@angular/core';
import { UserprofileService } from '../services/userprofile.service';
import { AppDataService } from '../services/app-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lightboxsidebar',
  templateUrl: './lightboxsidebar.component.html',
  styleUrls: ['./lightboxsidebar.component.scss']
})
export class LightboxsidebarComponent implements OnInit {
  initiateDeleteLightbox: boolean;
  lightboxToBeDeleted: { name: any; id: any; };
  lightboxesOfCurrentUser: any;
  lightboxProfilesMap = [];
  profileThumbView = [];
  lightboxToBeShared: any;
  profileFallback = '/assets/images/profile/profileFallback.jpg';
  loadSpinner = false;
  @Input() lightboxID: any;
  @Input() groupName: any;
  constructor(
    public userprofileService: UserprofileService,
    public appData: AppDataService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.appData.sidebarOpened) {
      this.loadLightboxes();
    }
  }
  shareLightboxInitiate(group) {
    // console.log(group);
    this.closeSidebar();
    this.userprofileService.showSendLightboxForm = true;
    this.lightboxToBeShared = group;
  }
  closeLightboxInitiate() {
    this.userprofileService.showSendLightboxForm = false;
  }
  updateMemberNotes(member, group) {
    this.userprofileService.addToLightbox([group.id], member, member.field_groupnotes)
    console.log(member);
  }
  thumbnailImage(thumbObj = [], fullImageObj = []){
    // member.field_photo_thumbnails_export[0].url || member.field_photos_export[0].url
    if (thumbObj.length > 0) {
      return thumbObj[0].url;
    } else {
      if (fullImageObj.length > 0) {
        return fullImageObj[0].url;
      } else {
        return this.profileFallback;
      }

    }
  }
  shareLightbox(userprofileService) {
    this.loadSpinner = true;
    const group = this.lightboxToBeShared;
    const groupInfo = {profiles: '', groupName: '', emailInfo: {}, groupID: ''};
    groupInfo.profiles = this.lightboxProfilesMap[group.name];
    groupInfo.groupName = group.name;
    groupInfo.groupID = group.id;
    groupInfo.emailInfo = {
      to: this.userprofileService.shareLightboxTO,
      cc: this.userprofileService.shareLightboxCC,
      comment: this.userprofileService.shareLightboxComment,
      selfName: this.userprofileService.shareLightboxSelfName,
      selfEmail: this.userprofileService.shareLightboxSelfEmail,
    };
    console.log(groupInfo);
    this.userprofileService.shareLightboxEmail(groupInfo).subscribe(res => {
      console.log(res);
      this.loadSpinner = false;
      this.userprofileService.showSendLightboxForm = false;
    });
  }
  toggleProfileViewLightbox(i) {
    this.profileThumbView[i] = !this.profileThumbView[i];
  }
  openProfileInfo(uid) {
    this.appData.profileOpened = true;
    this.appData.sidebarOpened = false;
    this.router.navigate(['/details', uid]);
  }
  openSidebar() {
    if (this.lightboxID) {
      this.appData.sidebarOpened = !this.appData.sidebarOpened;
      this.loadProfilesOfLightbox({id: this.lightboxID});
    } else {
      if (! this.userprofileService.checkIfCustomer()) {
        this.router.navigate(['/customer-login']);
      } else {
        this.appData.sidebarOpened = !this.appData.sidebarOpened;
        if (this.appData.sidebarOpened) {
          this.loadLightboxes();
        }
      }
    }
  }

  closeSidebar() {
    this.appData.sidebarOpened = false;
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
  removeFromLightbox(model, group) {
    const gid = group.id;
    this.userprofileService.removeFromLightbox(model, gid).subscribe(res => {
      this.loadProfilesOfLightbox(group);
    });
  }
  loadLightboxes() {
    this.userprofileService.loadGroupsOfCustomer().subscribe(res => {
      const response = res;
      this.lightboxesOfCurrentUser = response;
      // console.log(this.lightboxesOfCurrentUser);
      this.userprofileService.lightboxesOfCurrentUser = this.lightboxesOfCurrentUser;
      for (let index = 0; index < this.userprofileService.lightboxesOfCurrentUser.length; index++) {
        this.loadProfilesOfLightbox(this.userprofileService.lightboxesOfCurrentUser[index]);
      }
    });
  }
  loadProfilesOfLightbox(item) {
    if (!this.lightboxesOfCurrentUser && this.lightboxID && this.groupName) {
      this.lightboxesOfCurrentUser = [{name: this.groupName, id: this.lightboxID}];
    }
    this.userprofileService.loadProfilesOfLightbox(item.id).subscribe(res => {
      // const name = item.name.toLowerCase().replace(' ', '');
      const name = (item.name) ? item.name.toString() : this.groupName;
      this.lightboxProfilesMap[name] = [];
      this.lightboxProfilesMap[name].push(res);
      // console.log(this.lightboxProfilesMap);
    });
  }
}
