import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../shared/models/menu';
import { MenuService } from '../shared/services/menu.service';

@Component({
  selector: 'app-menu-overview',
  templateUrl: './menu-overview.component.html',
  styleUrls: ['./menu-overview.component.scss']
})
export class MenuOverviewComponent implements OnInit {
  menus: Menu[] = []

  constructor(private menuService: MenuService, private router: Router) { }

  ngOnInit(): void {
    this.menuService.getMenus().subscribe(res => {
      this.menus = res
    })
  }

  openMenu(id: String): void {
    this.router.navigate(['/details', id])
  }
}
