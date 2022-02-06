import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from '../shared/models/menu';
import { MenuService } from '../shared/services/menu.service';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.scss']
})
export class MenuDetailComponent implements OnInit {
  menu: Menu = {} as Menu;
  imageURL: string = "";
  ingredientsSplit: string[] = [];

  constructor(private menuService: MenuService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.menuService.getMenuById(this.route.snapshot.paramMap.get('id')!).subscribe(res => {
      this.menu = res
      this.imageURL = `https://eatthis.fra1.digitaloceanspaces.com/${this.menu.image_id}.jpg`;
      this.ingredientsSplit = res.ingredients.split("\n");
    })  }

}
