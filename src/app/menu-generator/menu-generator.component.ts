import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Menu } from '../shared/models/menu';
import { MenuService } from '../shared/services/menu.service';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-menu-generator',
  templateUrl: './menu-generator.component.html',
  styleUrls: ['./menu-generator.component.scss'],
})
export class MenuGeneratorComponent implements OnInit {
  faLock = faLock;
  faLockOpen = faLockOpen;
  kcalMin = 200;
  kcalMax = 6500;
  imgHeight = 0;
  imgWidth = 0;
  group = new FormGroup({
    kcal: new FormControl(Math.round(this.kcalMax / 3), [Validators.required]),
    numOfRecipes: new FormControl(5, [Validators.required]),
  });
  screenWidth = 100;
  menus: Menu[] = [];
  lockedMenuIds: string[] = [];
  hover = false;
  maxHeight = 250;
  isMobile = false;

  constructor(private menuService: MenuService, private router: Router) {}

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.isMobile = this.screenWidth <= 1340 ? true : false;
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

    setInterval(() => {
      if (this.menus.length > 0) {
        let img;
        if (this.isMobile) {
          img = document.getElementsByClassName('previewImg')[
            this.group.get('numOfRecipes')?.value * 2 - 1
          ] as HTMLElement;
        } else {
          img = document.getElementsByClassName('previewImg')[0] as HTMLElement;
        }
        this.imgHeight = img.offsetHeight;
        this.imgWidth = img.offsetWidth;
      }
    }, 500);
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
            const notLockedMenuIndex = [];
            for (let i = 0; i < this.menus.length; i++) {
              const menu = this.menus[i];
              if (!this.lockedMenuIds.includes(menu.id)) {
                notLockedMenuIndex.push(i);
              }
            }
            for (let i = 0; i < res.length; i++) {
              const element = res[i];
              this.menus[notLockedMenuIndex[i]] = element;
            }
            setTimeout(() => {
              this.maxHeight = 200;
              this.maxHeight = this.getHighestHeight();
            }, 1000);
          });
      } else {
        this.menuService
          .generateMenus(kcal, this.group.get('numOfRecipes')?.value)
          .subscribe((res) => {
            this.menus = res;
            setTimeout(() => {
              this.maxHeight = 200;
              this.maxHeight = this.getHighestHeight();
            }, 1000);
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

  openMenu(id: string) {
    window.open('/details/' + id);
  }

  getHighestHeight(): number {
    const menuItems = document.getElementsByClassName('menu-item-desktop');
    let maxHeight = 0;
    for (let i = 0; i < menuItems.length; i++) {
      const menu = menuItems.item(i) as HTMLElement;
      if (menu.offsetHeight > maxHeight) {
        maxHeight = menu.offsetHeight;
      }
    }
    return maxHeight;
  }

  generatePDF() {
    const doc = new jsPDF();
    for (let i = 0; i < this.menus.length; i++) {
      doc.text('' + this.menus[i].title, 15, 20);
      doc.addImage(
        '' + this.getImageURL(this.menus[i].image_id),
        'JPEG',
        15,
        35,
        100,
        100
      );
      doc.setFontSize(10);
      doc.text('Zutaten:', 120, 40);
      //this.ingredientsSplit = res.ingredients.split('\n');
      let count = 45;
      this.menus[i].ingredients.split('\n').map((ingredient) => {
        doc.text('- ' + ingredient, 125, count);
        count += 5;
      });
      doc.setFont('default', 'bold');
      doc.text('' + this.menus[i].description, 15, 145);
      doc.setFont('default', 'normal');
      doc.text('' + this.menus[i].procedure, 15, 150);
      
      let headers = [
        "kcal",
        "Eiweiss",
        "Fett",
        "Kohlenhydrate"
      ]

      let tableData = {
        kcal: this.menus[i].energy_cal.toString(),
        Eiweiss: this.menus[i].protein_g.toString(),
        Fett: this.menus[i].fat_g.toString(),
        Kohlenhydrate: this.menus[i].carbohydrate_g.toString()
      }
      let data = []
      data.push(Object.assign({}, tableData));
      doc.table(15, 170, data, headers, { autoSize: true});

      // TODO fix overflow
      // TODO instert table
      // TODO remove submit
      // TODO design
      // TODO check if last page
      doc.addPage('a4', 'p');
    }
    // http://raw.githack.com/MrRio/jsPDF/master/

    doc.save('tableToPdf.pdf');
  }
}
