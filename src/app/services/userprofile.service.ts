import { AppDataService } from './app-data.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {
  basicAuthForAPI = 'Basic YXBpdXNlcjphcGkuY2FzdGl0LmRrQG1haWxpbmF0b3IuY29t';
  showSendLightboxForm = false;
  shareLightboxComment = '';
  shareLightboxTO = '';
  shareLightboxCC = '';
  shareLightboxSelfName = '';
  shareLightboxSelfEmail = '';
  showAddToLightboxComponent = false;
  commentForModelInLightbox = '';
  userProfileEmpty = [{
    field_profile_number_export: '',
    field_photos_export: [],
    field_first_name_export: '',
    field_last_name_export: '',
    field_about_me_export: '',
    field_address_export: '',
    field_agreed_to_terms_export: '',
    field_birthday_export: '',
    field_bra_size_export: '',
    field_bureau_export: '',
    field_category_export: [],
    field_cellphone_export: '',
    field_city_export: '',
    field_country_export: '',
    created_export: '',
    field_dialect_one_export: '',
    field_dialect_three_export: '',
    field_dialect_two_export: '',
    field_ethnic_origin_export: '',
    field_fax_export: '',
    field_first_name_export_1: '',
    field_gender_export: '',
    field_migrate_example_gender_export: false,
    field_hair_color_export: '',
    field_language_four_export: '',
    field_language_four_rating_export: 0,
    field_language_one_export: '',
    field_language_one_rating_export: 0,
    field_language_three_export: '',
    field_language_three_rating_export: 0,
    field_language_two_export: '',
    field_language_two_rating_export: 0,
    field_last_name_export_1: '',
    field_licenses_export: [],
    name_export: '',
    field_nationality_export: '',
    field_new_from_export: '',
    field_new_profile_export: '',
    field_new_until_export: '',
    field_occupation_export: '',
    field_old_profile_id_export: '',
    langcode_export: '',
    field_pant_size_from_export: '',
    field_pant_size_to_export: '',
    delta: '',
    field_photo_thumbnails_export: [],
    field_photos_export_1: [],
    field_profile_number_export_1: '',
    field_profile_status_export: '',
    field_profile_type_export: '',
    field_recently_updated_export: '0',
    field_shirt_size_from_export: '',
    field_shirt_size_to_export: '',
    field_shoe_size_from_export: '',
    field_shoe_size_to_export: '',
    field_skills_export: [],
    field_sports_and_hobby_export: '',
    field_suit_size_from_export: '',
    field_suit_size_to_export: '',
    field_telephone_export: [],
    changed_export: '',
    uid_export: '',
    field_video_thumbnails_export: [],
    field_videos_export: [],
    field_zipcode_export: '',
    field_skills: '',
    field_language_four: '',
    field_language_four_rating: '',
    field_language_one: '',
    field_language_one_rating: '',
    field_language_three: '',
    field_language_three_rating: '',
    field_language_two: '',
    field_language_two_rating: '',
    field_licenses: '',
    field_eye_color_export: '',
    field_height_export: '',
    field_height: '',
    field_weight_export: '',
    field_weight: '',
    field_organization_export: '',
    password: '',
    field_photos: '-',
    field_videos: '-'
  }];
  userProfile = localStorage.getItem('currentUserProfile') ? JSON.parse(localStorage.getItem('currentUserProfile')) : this.userProfileEmpty;
  newLightboxName: any;
  lightboxesOfCurrentUser = [];
  modelToBeAddedToLightbox: any;
  urlLang = (this.appService.langcode === 'DA') ? '/da' : '/en';
  constructor(
    private http: HttpClient,
    private appService: AppDataService
  ) { }
  registerUser(profileInfoJson = {}) {
    const registerEndpoint = environment.backendBaseUrl + this.urlLang + '/user/register?_format=json';
    return this.http.post(registerEndpoint, profileInfoJson);
  }
  checkEmail(email) {
    const emailCheckUrl = environment.backendBaseUrl + this.urlLang + '/api/email/check';
    return this.http.post(emailCheckUrl, {email});
  }
  shareLightboxEmail(groupInfo) {
    const shareLightboxUrl = environment.backendBaseUrl + this.urlLang + '/api/share-lightbox';
    return this.http.post(shareLightboxUrl, groupInfo);
  }

  setUserStatus(uid, status) {
    const setStatusEndpoint = environment.backendBaseUrl + '/en/api/set-status';
    const data = {uid, status};
    return this.http.post(setStatusEndpoint, data);
  }

  loadProfilesOfLightbox(gid) {
    const profilesOfLightboxUrl = environment.backendBaseUrl + this.urlLang + '/lightbox/' + gid + '/members';
    return this.http.get(profilesOfLightboxUrl);
  }

  updatePassword(email, pass) {
    const updatePasswordUrl = environment.backendBaseUrl + this.urlLang + '/api/update-password';
    const data = {email, pass};
    return this.http.post(updatePasswordUrl, data);
  }
  addToLightbox(selectedGroups, member = '', groupNotes = '') {
    const model = (member) ? member : this.modelToBeAddedToLightbox;
    const comment = (!groupNotes) ? this.commentForModelInLightbox : groupNotes;
    const addToLightboxUrl = environment.backendBaseUrl + this.urlLang + '/api/lightbox/addmember';
    const data = {
      user: model,
      gids: selectedGroups,
      comment
    };
    this.http.post(addToLightboxUrl, data).subscribe(res => {
      this.showAddToLightboxComponent = false;
    });
  }

  removeFromLightbox(model, gid) {
    const removeFromLightboxUrl = environment.backendBaseUrl + this.urlLang + '/api/lightbox/removemember';
    const data = {
      user: model,
      gids: gid
    };
    return this.http.post(removeFromLightboxUrl, data);
  }
  resetPassword(user) {
    const resetPasswordUrl = environment.backendBaseUrl + this.urlLang + '/api/reset-password';
    return this.http.post(resetPasswordUrl, user);
  }

  checkIfCustomer() {
    if (
        this.userProfile &&
        this.userProfile[0] &&
        this.userProfile[0].roles_target_id &&
        this.userProfile[0].roles_target_id.toLowerCase() === 'customer'
      ) {
        return true;
      } else {
        return false;
      }
  }

  login(userJson) {
    const headers = new HttpHeaders('Content-type:application/json');
    const options = {
      headers
    };
    const loginEndPoint = environment.backendBaseUrl + this.urlLang + '/user/login?_format=json';
    return this.http.post(loginEndPoint, userJson, options);
  }

  logout() {
    this.userProfile = this.userProfileEmpty;
    localStorage.setItem('currentUserProfile', JSON.stringify(this.userProfile));
    localStorage.removeItem('userLoginResponse');
  }

  loadGroupsOfCustomer() {
    const uid = this.userProfile[0].uid_export;
    const groupsUrl = environment.backendBaseUrl + this.urlLang + '/lightboxes/' + uid;
    return this.http.get(groupsUrl);
  }

  loadProfile(uid, role = 'model') {
    let userProfileEndPoint = '';
    switch (role) {
      case '':
      case 'model':
      default:
        userProfileEndPoint = environment.backendBaseUrl + this.urlLang + '/model/' + uid;
        break;
      case 'customer':
        userProfileEndPoint = environment.backendBaseUrl + this.urlLang + '/customer/' + uid;
        break;
    }

    return this.http.get(userProfileEndPoint);
  }

  addLightbox() {
    const addLightboxUrl = environment.backendBaseUrl + this.urlLang + '/api/create-lightbox';
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const options = {
      headers
    };
    const lightboxData = {
      name: this.newLightboxName,
      uid: this.userProfile[0].uid_export
    };
    return this.http.post(addLightboxUrl, lightboxData, options);
  }
  removeLightbox(gid) {
    const deleteLightboxUrl = environment.backendBaseUrl + this.urlLang + '/group/' + gid;
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: this.basicAuthForAPI
    });
    const options = {
      headers
    };
    return this.http.delete(deleteLightboxUrl, options);
  }

  saveProfile(role = 'model') {
    const headers = new HttpHeaders('Content-type:application/json');
    const options = {
      headers
    };
    this.userProfile[0].roleType = role;
    console.log(this.userProfile[0]);
    const saveUserEndPoint = environment.backendBaseUrl + this.urlLang + '/api/user-update';
    return this.http.post(saveUserEndPoint, this.userProfile[0], options);
  }

  isLoggedIn() {
    if (this.userProfile[0] && this.userProfile[0].uid_export) {
      return true;
    } else {
      return false;
    }
  }

  adminList(status) {
    const listingUrl = environment.backendBaseUrl + '/en/castit-admin/models-list/' + status;
    return this.http.get(listingUrl);
  }
}
