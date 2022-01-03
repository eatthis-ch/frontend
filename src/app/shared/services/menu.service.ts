import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Menu } from '../models/menu';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getMenus(): Observable<Menu[]> {
    const mockData = [{
      id: 1,
      title: 'test',
      carbohydrate_g: 1,
      energy_cal: 1,
      fat_g: 1,
      protein_g: 1,
      ingredients: 'abc',
      procedure: 'def',
    },
    {
      id: 2,
      title: 'test2',
      carbohydrate_g: 2,
      energy_cal: 2,
      fat_g: 2,
      protein_g: 2,
      ingredients: 'abc2',
      procedure: 'def2',
    },
    {
      id: 3,
      title: 'test3',
      carbohydrate_g: 3,
      energy_cal: 13,
      fat_g: 13,
      protein_g: 13,
      ingredients: 'abc3',
      procedure: 'def3',
    },
    {
      id: 1,
      title: 'test',
      carbohydrate_g: 1,
      energy_cal: 1,
      fat_g: 1,
      protein_g: 1,
      ingredients: 'abc',
      procedure: 'def',
    },
    {
      id: 2,
      title: 'test2',
      carbohydrate_g: 2,
      energy_cal: 2,
      fat_g: 2,
      protein_g: 2,
      ingredients: 'abc2',
      procedure: 'def2',
    },
    {
      id: 3,
      title: 'test3',
      carbohydrate_g: 3,
      energy_cal: 13,
      fat_g: 13,
      protein_g: 13,
      ingredients: 'abc3',
      procedure: 'def3',
    },
    {
      id: 1,
      title: 'test',
      carbohydrate_g: 1,
      energy_cal: 1,
      fat_g: 1,
      protein_g: 1,
      ingredients: 'abc',
      procedure: 'def',
    },
    {
      id: 2,
      title: 'test2',
      carbohydrate_g: 2,
      energy_cal: 2,
      fat_g: 2,
      protein_g: 2,
      ingredients: 'abc2',
      procedure: 'def2',
    },
    {
      id: 3,
      title: 'test3',
      carbohydrate_g: 3,
      energy_cal: 13,
      fat_g: 13,
      protein_g: 13,
      ingredients: 'abc3',
      procedure: 'def3',
    },] as Menu[]

    return of(mockData)
  }
}
