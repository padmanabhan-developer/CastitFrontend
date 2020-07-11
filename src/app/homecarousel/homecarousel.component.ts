import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-homecarousel',
  templateUrl: './homecarousel.component.html',
  styleUrls: ['./homecarousel.component.scss']
})
export class HomecarouselComponent implements OnInit {
  images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 11, 12, 13, 14, 15, 16, 17, 18].map((n) => `/assets/images/landing/${n}.jpg`);
  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
  constructor() { }
  ngOnInit() {
  }

}
