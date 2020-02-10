import { Component, OnInit } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap'
@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
images = [
  "https://www.gstatic.com/webp/gallery/1.jpg",
  "https://www.gstatic.com/webp/gallery/2.jpg",
  "https://www.gstatic.com/webp/gallery/3.jpg"
]
  constructor() { }

  ngOnInit() {

  }

}