import { Component, Input, OnInit } from '@angular/core';
import { Menu } from '../../models/menu';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() menu: Menu = {} as Menu

  imageURL: string = "";

  constructor() { }

  ngOnInit(): void {
    this.imageURL = `https://eatthis.fra1.digitaloceanspaces.com/${this.menu.image_id}.jpg`;
  }

}
