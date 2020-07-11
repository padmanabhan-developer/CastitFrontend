import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../services/app-data.service';
import { UserprofileService } from '../services/userprofile.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(
    public appService: AppDataService,
    public userprofileService: UserprofileService,
  ) { }

  ngOnInit() {
  }

}