import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu } from '../models/menu';

const recipeURL = environment.BACKEND_URL + '/recipes';
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private httpClient: HttpClient) {}

  getImageURL(image_id: string): string {
    return `https://eatthis.fra1.digitaloceanspaces.com/${image_id}.jpg`;
  }
  getMenus(page: number): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(recipeURL + `?page=${page}`);
  }

  generateMenus(
    kcal: number,
    numOfRecipes: number,
    lockedMenuIds?: String[]
  ): Observable<Menu[]> {
    if (lockedMenuIds) {
      return this.httpClient.get<Menu[]>(
        recipeURL +
          `/generate?calories=${kcal}&numberOfRecipes=${numOfRecipes}&usedRecipes=${lockedMenuIds}`
      );
    }
    return this.httpClient.get<Menu[]>(
      recipeURL + `/generate?calories=${kcal}&numberOfRecipes=${numOfRecipes}`
    );
  }

  getMenuById(id: string): Observable<Menu> {
    return this.httpClient.get<Menu>(recipeURL+`/${id}`);
  }
}
