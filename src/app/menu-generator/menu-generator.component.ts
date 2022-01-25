import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Menu } from '../shared/models/menu';
import { MenuService } from '../shared/services/menu.service';

@Component({
  selector: 'app-menu-generator',
  templateUrl: './menu-generator.component.html',
  styleUrls: ['./menu-generator.component.scss'],
})
export class MenuGeneratorComponent implements OnInit {
  kcalMin = 200;
  kcalMax = 6500;
  group = new FormGroup({
    kcal: new FormControl(Math.round(this.kcalMax / 3), [Validators.required]),
    numOfRecipes: new FormControl(5, [Validators.required]),
  });

  menus: Menu[] = [];
  lockedMenuIds: string[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.group.get('numOfRecipes')?.valueChanges.subscribe((change) => {
      if (change !== null) {
        this.kcalMax = 1300 * change;
        this.kcalMin = 50 * change;
        if (this.group.get('kcal')?.value > this.kcalMax) {
          this.group.get('kcal')?.setValue(this.kcalMax);
        }
        if (this.group.get('kcal')?.value < this.kcalMin) {
          this.group.get('kcal')?.setValue(this.kcalMin);
        }
      }
    });
  }

  submit() {
    if (this.group.valid) {
      let kcal = this.group.get('kcal')?.value;
      if (this.lockedMenuIds.length >= 1) {
        const lockedMenus = this.menus.filter((el) =>
          this.lockedMenuIds.includes(el.id)
        );
        for (let lockedMenu of lockedMenus) {
          kcal -= lockedMenu.carbohydrate_g;
        }

        this.menuService
          .generateMenus(
            kcal,
            this.group.get('numOfRecipes')?.value,
            this.lockedMenuIds
          )
          .subscribe((res) => {
            this.menus = lockedMenus;
            res.forEach((menu) => {
              this.menus.push(menu);
            });
          });
      } else {
        this.menuService
          .generateMenus(kcal, this.group.get('numOfRecipes')?.value)
          .subscribe((res) => {
            this.menus = res;
          });
      }
    }
  }

  changeValue(direction: boolean) {
    const numberInput = document.getElementsByClassName(
      'recipeNumber'
    )[0] as HTMLInputElement;
    if (direction) {
      numberInput.stepUp();
    } else {
      numberInput.stepDown();
    }
    this.group.get('numOfRecipes')?.setValue(numberInput.value);
  }

  lockMenu(id: string) {
    if (this.lockedMenuIds.includes(id)) {
      this.lockedMenuIds = this.lockedMenuIds.filter((el) => el !== id);
    } else {
      this.lockedMenuIds.push(id);
    }
  }

  getImageURL(imgURL: string): string {
    return this.menuService.getImageURL(imgURL);
  }
}
