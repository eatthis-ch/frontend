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
    this.router.navigate(['']);
    const temp = setTimeout(() => {
      const highestTimeoutId = setTimeout(';');
      for (let i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
      }
    }, 200);
  }

  clickGenerator() {
    this.router.navigate(['generator']);
  }
}
