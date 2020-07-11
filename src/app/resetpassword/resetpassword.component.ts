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
    this.userprofileService.resetPassword(user).subscribe(res => {
      this.isLoading = false;
      this.router.navigate(['/profiles']);
    });
  }
}
