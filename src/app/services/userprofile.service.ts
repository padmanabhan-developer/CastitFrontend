import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {
  constructor(
    private http: HttpClient
  ) { }
  registerUser(profileInfoJson = {}) {
    profileInfoJson = {
      field_first_name: ['abc'],
      field_height: ['123'],
      field_last_name: ['xyz'],
      field_birthday: ['29/12/2019'],
      field_bureau: ['bbrruu'],
      field_occupation: ['occup'],
      field_shirt_size: ['44'],
      field_weight: ['77']
      };
    const options = {
    };
    const registerEndpoint = environment.backendBaseUrl + '/user/register?_format=json';
    this.http.post(registerEndpoint, profileInfoJson, options).subscribe();
  }

  login(userJson){
    console.log('service--', userJson);
    const headers = new HttpHeaders('Content-type:application/json');
    
    const options = {
      headers
    };
    const loginEndPoint = environment.backendBaseUrl + '/user/login?_format=json';
    this.http.post(loginEndPoint, userJson, options).subscribe(
      (data) => {console.log(data); }
    );
  }
}
