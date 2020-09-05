import { Router } from '@angular/router';
import { UserprofileService } from './userprofile.service';
import { Injectable } from '@angular/core';
// import dataSet from './jsonData.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
    userDataEmpty = {
        uid: [
            {
                value: ''
            }
        ],
        uuid: [
            {
                value: ''
            }
        ],
        langcode: [
            {
                value: ''
            }
        ],
        preferred_langcode: [
            {
                value: ''
            }
        ],
        preferred_admin_langcode: [{value: ''}],
        name: [
            {
                value: ''
            }
        ],
        mail: [
            {
                value: ''
            }
        ],
        timezone: [
            {
                value: ''
            }
        ],
        status: [
            {
                value: ''
            }
        ],
        created: [
            {
                value: '',
                format: 'Y-m-d\\TH:i:sP'
            }
        ],
        changed: [
            {
                value: '',
                format: 'Y-m-d\\TH:i:sP'
            }
        ],
        access: [
            {
                value: '',
                format: 'Y-m-d\\TH:i:sP'
            }
        ],
        login: [
            {
                value: '',
                format: 'Y-m-d\\TH:i:sP'
            }
        ],
        init: [{value: ''}],
        roles: [
            {
                target_id: 'model',
                target_type: 'user_role',
                target_uuid: '63e280aa-4287-43a1-babb-e9dc861bb563'
            }
        ],
        default_langcode: [
            {
                value: ''
            }
        ],
        content_translation_source: [
            {
                value: ''
            }
        ],
        content_translation_outdated: [
            {
                value: ''
            }
        ],
        content_translation_uid: [
            {
                target_id: 1,
                target_type: 'user',
                target_uuid: '',
                url: ''
            }
        ],
        content_translation_status: [
            {
                value: ''
            }
        ],
        content_translation_created: [
            {
                value: '',
                format: 'Y-m-d\\TH:i:sP'
            }
        ],
        field_about_me: [{value: ''}],
        field_address: [
            {
                value: ''
            }
        ],
        field_agreed_to_terms: [
            {
                value: ''
            }
        ],
        field_birthday: [
            {
                value: ''
            }
        ],
        field_bra_size: [{value: ''}],
        field_bureau: [{value: ''}],
        field_category: [{value: ''}],
        field_cellphone: [
            {
                value: ''
            }
        ],
        field_city: [
            {
                value: ''
            }
        ],
        field_country: [
            {
                value: ''
            }
        ],
        field_dialect_one: [{value: ''}],
        field_dialect_three: [{value: ''}],
        field_dialect_two: [{value: ''}],
        field_ethnic_origin: [{value: ''}],
        field_eye_: [{value: ''}],
        field_eye_color: [{value: ''}],
        field_fax: [{value: ''}],
        field_first_name: [
            {
                value: ''
            }
        ],
        field_gender: [
            {
                value: ''
            }
        ],
        field_hair_color: [{value: ''}],
        field_height: [
            {
                value: ''
            }
        ],
        field_language_four: [{value: ''}],
        field_language_four_rating: [{value: ''}],
        field_language_one: [{value: ''}],
        field_language_one_rating: [{value: ''}],
        field_language_three: [{value: ''}],
        field_language_three_rating: [{value: ''}],
        field_language_two: [{value: ''}],
        field_language_two_rating: [{value: ''}],
        field_last_name: [
            {
                value: ''
            }
        ],
        field_licenses: [{value: ''}],
        field_migrate_example_favbeers: [{value: ''}],
        field_migrate_example_gender: [{value: ''}],
        field_nationality: [{value: ''}],
        field_new_from: [
            {
                value: '',
                format: 'Y-m-d\\TH:i:sP'
            }
        ],
        field_new_profile: [
            {
                value: ''
            }
        ],
        field_new_until: [
            {
                value: '',
                format: 'Y-m-d\\TH:i:sP'
            }
        ],
        field_occupation: [
            {
                value: ''
            }
        ],
        field_old_profile_id: [
            {
                value: ''
            }
        ],
        field_old_profile_number: [
            {
                value: ''
            }
        ],
        field_organization: [{value: ''}],
        field_pant_size_from: [{value: ''}],
        field_pant_size_to: [{value: ''}],
        field_payments: [
            {
                index: null,
                data: ''
            },
            {
                index: null,
                data: ''
            },
            {
                index: null,
                data: ''
            }
        ],
        field_photo_thumbnails: [{value: ''}],
        field_photos: [{value: ''}],
        field_profile_number: [
            {
                value: ''
            }
        ],
        field_profile_status: [
            {
                value: ''
            }
        ],
        field_profile_type: [
            {
                value: ''
            }
        ],
        field_recently_updated: [
            {
                value: ''
            }
        ],
        field_shirt_size_from: [
            {
                value: ''
            }
        ],
        field_shirt_size_to: [
            {
                value: ''
            }
        ],
        field_shoe_size_from: [
            {
                value: ''
            }
        ],
        field_shoe_size_to: [
            {
                value: ''
            }
        ],
        field_skills: [
            {
                value: ''
            }
        ],
        field_sports_and_hobby: [{value: ''}],
        field_suit_size_from: [{value: ''}],
        field_suit_size_to: [{value: ''}],
        field_telephone: [
            {
                value: ''
            },
            {
                value: ''
            }
        ],
        field_video_thumbnails: [{value: ''}],
        field_videos: [{value: ''}],
        field_weight: [
            {
                value: ''
            }
        ],
        field_zipcode: [
            {
                value: ''
            }
        ]
    };
    userData = this.userProfileService.userProfileEmpty;
    showInfoComponent = false;
    showMediaComponent = false;
    showListComponent = true;
    constructor(
        private http: HttpClient,
        public userProfileService: UserprofileService,
        public router: Router
    ) {}
    closePanel() {
        this.showInfoComponent = false;
        this.showMediaComponent = false;
        this.showListComponent = true;
        this.router.navigate(['/admin']);
    }
    loadProfile(uid, role = 'model') {
        let userProfileEndPoint = '';
        switch (role) {
          case '':
          case 'model':
          default:
            userProfileEndPoint = environment.backendBaseUrl + '/en' + '/castit-admin/model/' + uid;
            break;
          case 'customer':
            userProfileEndPoint = environment.backendBaseUrl + '/en' + '/customer/' + uid;
            break;
        }
        return this.http.get(userProfileEndPoint);
      }
    saveProfile(role = 'model', userData = this.userData[0]) {
        const headers = new HttpHeaders('Content-type:application/json');
        const options = {
          headers
        };
        const saveUserEndPoint = environment.backendBaseUrl + '/en' + '/api/user-update';
        return this.http.post(saveUserEndPoint, userData, options);
    }
    updateMediaStatus(uid, type, index, status) {
        const updateMediaStatusUrl = environment.backendBaseUrl + '/en' + '/api/set-media-status';
        const data = {uid, type, index, status};
        return this.http.post(updateMediaStatusUrl, data);
    }
    updateProfileNewStatus(value, uid) {
        const updateProfileNewStatusUrl = environment.backendBaseUrl + '/en' + '/api/set-profile-new-status';
        const data = {value, uid};
        return this.http.post(updateProfileNewStatusUrl, data);
    }

    updateProfileTypeAndNumber(value, uid) {
      const updateProfileTypeAndNumberUrl = environment.backendBaseUrl + '/en' + '/api/set-profile-type';
      const data = {value, uid};
      return this.http.post(updateProfileTypeAndNumberUrl, data);
    }
}
