import { Component, Input, OnInit } from '@angular/core';
import { Menu } from '../../models/menu';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {
  @Input() menu: Menu = {} as Menu;

  imageURL: string = '';

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.imageURL = this.menuService.getImageURL(this.menu.image_id);
  }
}
