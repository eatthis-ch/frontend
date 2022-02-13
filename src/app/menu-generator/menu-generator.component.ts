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
    const fontSizeTitle = 24;
    const fontSizeText = 10;

    for (let i = 0; i < this.menus.length; i++) {
      doc.setFontSize(fontSizeTitle);
      doc.text('' + this.menus[i].title, 15, 20);
      doc.addImage(
        '' + this.getImageURL(this.menus[i].image_id),
        'JPEG',
        15,
        35,
        100,
        100
      );
      doc.setFontSize(fontSizeText);
      doc.text('Zutaten:', 120, 40);

      let distanceInList = 45;
      this.menus[i].ingredients.split('\n').map((ingredient) => {
        if (ingredient.length > 38) {
          let textLines = doc
            .setFont('helvetica')
            .setFontSize(fontSizeText)
            .splitTextToSize('- ' + ingredient, 60);
          doc.text(textLines, 125, distanceInList);
          distanceInList += 3 * Math.ceil(ingredient.length / 20);
        } else {
          doc.text('- ' + ingredient, 125, distanceInList);
          distanceInList += 5;
        }
      });

      let descriptionLines = doc
        .setFont('helvetica', 'bold')
        .setFontSize(fontSizeText)
        .splitTextToSize('' + this.menus[i].description, 100);
      doc.text(descriptionLines, 15, 145);

      let procedureLines = doc
        .setFont('helvetica', 'normal')
        .setFontSize(fontSizeText)
        .splitTextToSize('' + this.menus[i].procedure, 100);
      doc.text(
        procedureLines,
        15,
        147 + 3 * Math.ceil(this.menus[i].description.length / 30)
      );
      console.log(3 * Math.ceil(this.menus[i].description.length / 30));

      let headers = ['kcal', 'E', 'F', 'K'];
      let tableData = {
        kcal: this.menus[i].energy_cal.toString(),
        E: this.menus[i].protein_g.toString(),
        F: this.menus[i].fat_g.toString(),
        K: this.menus[i].carbohydrate_g.toString(),
      };
      let data = [];
      data.push(Object.assign({}, tableData));
      doc.table(125, distanceInList, data, headers, {
        autoSize: false,
        fontSize: 12,
      });

      if (this.menus.length - 1 !== i) {
        doc.addPage('a4', 'p');
      }
    }
    doc.save('GeneratedMenus.pdf');
  }
}
