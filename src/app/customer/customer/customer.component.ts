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

  constructor(
    public userprofileService: UserprofileService,
    private appData: AppDataService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  saveUser(role) {
    this.userprofileService.saveProfile(role).subscribe((res) => {
      const respose: any = res;
      if (respose && respose.message && respose.message === 'create success') {
        this.router.navigate(['/profiles']);
      }
    });
  }
}
