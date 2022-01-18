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

  constructor(private menuService: MenuService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.menuService.getMenuById(this.route.snapshot.paramMap.get('id')!).subscribe(res => {
      this.menu = res
      console.log(res);
      
    })
    //console.log(this.menu);
  }

}
