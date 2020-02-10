import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../services/app-data.service';

@Component({
  selector: 'app-hompage',
  templateUrl: './hompage.component.html',
  styleUrls: ['./hompage.component.css']
})
export class HompageComponent implements OnInit {
  data = {};
  defaultImage = '/assets/images/loader/PolygonLoader.svg';
  profileFallback = '/assets/images/profile/profileFallback.jpg';
  constructor(
    private appService: AppDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.data = this.appService.dataSet;
    console.log(this.data)
  }
  loadProfile(id) {
    this.router.navigate(['/details', id]);
    // this.router.navigate(['/details']);
  }

}
