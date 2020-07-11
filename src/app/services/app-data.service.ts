import { Injectable } from '@angular/core';
// import dataSet from './jsonData.json';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  backendBasePath = environment.backendBaseUrl;
  dataSet = {};
  langcode = '';
  urlLang = (this.langcode === 'DA') ? '/da' : '/en';
  profileInfoUrl = this.backendBasePath + this.urlLang + '/model/';
  allProfilesUrl = this.backendBasePath + '/models';
  allCProfilesUrl = this.backendBasePath + '/cmodels';
  allYProfilesUrl = this.backendBasePath + '/ymodels';
  backendUrlToFetchTempAccess = this.backendBasePath + '/api/get-temp-access';
  backendUrltoInitiateZencoder = this.backendBasePath + '/api/trigger-zencoder';
  defaultImage = '/assets/images/loader/PolygonLoader.svg';
  profileFallback = '/assets/images/profile/profileFallback.jpg';
  castitFilesCDN = 'https://97d4e4ae222d9afabd38-7fc9b1f79831eb45cc1a1ba6343e648b.ssl.cf3.rackcdn.com/';
  loginUrl = '/user/login?_format=json';
  registerUrl = '/user/register?_format=json';
  profileData = {};
  loadedProfileData = [];
  cloudFilesTempUrl: any;
  profileOpened = false;
  sidebarOpened = false;
  apiUserDA = 'Basic YXBpdXNlcjphcGkuY2FzdGl0LmRrQG1haWxpbmF0b3IuY29t';
  apiUserEN = 'Basic ZW4uYXBpdXNlcjphcGkuY2FzdGl0LmRrQG1haWxpbmF0b3IuY29t';
  addToLightboxImage = '';
  translatableFields = [
    'field_category',
    'field_country',
    'field_eye_color',
    'field_gender',
    'field_hair_color',
    'field_language_one',
    'field_skills',
    'field_licenses'
  ];
  // sidebarStatus: Subject<boolean> = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('DA');
    this.langcode = 'DA';
    for (const field of this.translatableFields) {
      if (!localStorage.getItem('DA-' + field)) {
        this.getFieldAvailableOptions(field, 'DA').subscribe(res => {
          const response: any = res;
          localStorage.setItem('DA-' + field, JSON.stringify(response.settings.allowed_values));
        });
        this.getFieldAvailableOptions(field, 'EN').subscribe(res => {
          const response: any = res;
          localStorage.setItem('EN-' + field, JSON.stringify(response.settings.allowed_values));
        });
      }
    }
  }

  getLightboxProfiles(gid) {
    // this.http.get();
  }
  setLanguage(langcode) {
    this.translate.setDefaultLang(langcode);
    this.langcode = langcode;
  }
  getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  getProfiles(queryString = '') {
    const url = this.allProfilesUrl + queryString;
    return this.http.get(url);
  }
  getCProfiles(queryString = '') {
    const url = this.allCProfilesUrl;
    return this.http.get(url);
  }
  getYProfiles(queryString = '') {
    const url = this.allYProfilesUrl;
    return this.http.get(url);
  }
  getSingleProfile(id) {
    const auth = (this.langcode === 'EN') ? this.apiUserEN : this.apiUserDA;
    this.addToLightboxImage = '';
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth
      }
    };
    const url = this.profileInfoUrl + id;
    return this.http.get(url, options);
  }
  getCloudTempUrl(filename) {
    const url = this.backendUrlToFetchTempAccess + '?filename="' + filename + '"';
    return this.http.get(url, {"headers" : {"Content-Type": "application/json"}});
  }
  postFile(fileToUpload: File, filename) {
    const endpoint = this.cloudFilesTempUrl;
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.put(endpoint, fileToUpload, { observe: 'response' });
  }

  initiateZencoder(filename) {
    return this.http.post(this.backendUrltoInitiateZencoder, {filename});
  }

  getFieldAvailableOptions(field, lang = this.langcode) {
    const auth = (this.langcode === 'EN') ? this.apiUserEN : this.apiUserDA;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth
      }
    };
    const langURL = '/' + lang.toLowerCase();
    const url = this.backendBasePath + langURL + '/entity/field_storage_config/user.' + field;
    console.log(url);
    return this.http.get(url, options);
  }
}
