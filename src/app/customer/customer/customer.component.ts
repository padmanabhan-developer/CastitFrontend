import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile.service';
import { AppDataService } from 'src/app/services/app-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  inValidEmail = false;
  emailExists = false;


  constructor(
    public userprofileService: UserprofileService,
    private appData: AppDataService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  saveUser(role) {
    this.userprofileService.saveProfile(role).subscribe((res) => {
      const response: any = res;
      if (response && response.message && response.message === 'create success') {
        this.router.navigate(['/profiles']);
      }
    });
  }

  emailValidation(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail)) {
      return (true);
    }
    return (false);
  }

  checkEmail() {
    console.log(this.userprofileService);
    if (!this.emailValidation(this.userprofileService.userProfile[0].name_export)) {
      this.inValidEmail = true;
    } else {
      this.inValidEmail = false;
    }
    if (this.userprofileService.userProfile[0].name_export && !this.userprofileService.isLoggedIn()) {
      this.userprofileService.checkEmail(this.userprofileService.userProfile[0].name_export).subscribe(res => {
        const response: any = res;
        if (response.message === 'exists') {
          this.emailExists = true;
        } else {
          this.emailExists = false;
        }
      });
    }
  }
}
