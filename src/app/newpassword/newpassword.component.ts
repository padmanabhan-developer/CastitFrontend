import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserprofileService } from '../services/userprofile.service';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.scss']
})
export class NewpasswordComponent implements OnInit {
  passOne = '';
  passTwo = '';
  mismatch = false;
  queryParams: any;
  email: any;
  pass: any;
  allowNewPass = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userprofileService: UserprofileService
    ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.queryParams = {...params};
      this.email = this.queryParams.email;
      this.pass = atob(this.queryParams.resethash);
      console.log(this.email, this.pass);
      this.userprofileService.login({name: this.email, pass: this.pass}).subscribe(res => {
        const response: any = res;
        if (response.current_user && response.current_user.uid) {
          this.allowNewPass = true;
        }
        else {
          this.allowNewPass = false;
        }
      });

    });
  }

  newPassword(pass) {
    if (this.passOne === this.passTwo) {
      this.mismatch = false;
    } else {
      this.mismatch = true;
    }

    if (!this.mismatch) {
      this.userprofileService.updatePassword(this.email, this.passOne).subscribe(res => {
        this.router.navigate(['/login']);
      });
    }
  }
}
