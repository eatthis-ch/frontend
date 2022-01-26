import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faDice, faArchive } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  faDice = faDice;
  faArchive = faArchive;

  clickOverview() {
    this.router.navigate(['overview']);
  }

  clickGenerator() {
    this.router.navigate(['']);
  }

  clickSettings() {}

  clickAdd() {}
}
