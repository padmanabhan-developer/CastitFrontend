import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() popupType;
  popupTitle = '';
  popupMessage = '';
  redirectRoute = '';
  constructor(private router: Router) { }

  ngOnInit() {
    switch (this.popupType) {
      case 'mediaUpdated':
      case 'reset':
      case 'lightboxSent':
        this.redirectRoute = '/profiles';
        break;
      case 'newPassword':
        this.redirectRoute = '/login';
        break;
      case 'profileUpdated':
      case 'userSave':
        this.redirectRoute = '/login/7';
        break;

      default:
        break;
    }
  }

  closeToRedirect() {
    this.router.navigate([this.redirectRoute]);
  }

}
