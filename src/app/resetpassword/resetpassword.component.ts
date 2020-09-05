import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserprofileService } from '../services/userprofile.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  isLoading = false;
  showPopup = false;
  wrongEmail = false;
  user = {
    name: ''
  };
  constructor(
    public userprofileService: UserprofileService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  resetPassword(user) {
    this.isLoading = true;
    this.wrongEmail = false;
    this.userprofileService.resetPassword(user).subscribe(res => {
      const response: any = res;
      if (response.message === 'ERROR') {
        this.wrongEmail = true;
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.showPopup = true;
        this.router.navigate(['/reset-password-info']);
      }
    }, (err) => {
      this.wrongEmail = true;
      this.isLoading = false;
    });
  }
}
