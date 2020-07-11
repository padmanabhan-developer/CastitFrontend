import { Component, OnInit } from '@angular/core';
import { UserprofileService } from '../services/userprofile.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'castit-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private userprofileService: UserprofileService,
    private cookie: CookieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userprofileService.logout();
    this.router.navigate(['/profiles']);
  }

}
