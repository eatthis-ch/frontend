import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../shared/models/menu';
import { MenuService } from '../shared/services/menu.service';

@Component({
  selector: 'app-menu-overview',
  templateUrl: './menu-overview.component.html',
  styleUrls: ['./menu-overview.component.scss'],
})
export class MenuOverviewComponent implements OnInit {
  menus: Menu[] = [];
  currentPage: number = 0;
  lock: boolean = false;
  wrapperHeight = window.innerHeight;

  constructor(private menuService: MenuService, private router: Router) {}

  ngOnInit(): void {
    this.menuService.getMenus(0).subscribe((res) => {
      this.menus = res;
    });
  }

  openMenu(id: String): void {
    this.router.navigate(['/details', id]);
  }

  getNextMenus(page: number) {
    this.menuService.getMenus(page).subscribe((res) => {
      res.forEach((menu) => {
        this.menus.push(menu);
      });
      this.lock = false;
    });
  }

  onScroll(event: any): void {
    const wrapper = document.getElementsByClassName('wrapper')[0];
    if (
      wrapper.scrollHeight - 1000 <=
        document.body.offsetHeight + wrapper.scrollTop &&
      !this.lock
    ) {
      this.lock = true;
      this.currentPage += 1;
      this.getNextMenus(this.currentPage);
    }
  }
}
