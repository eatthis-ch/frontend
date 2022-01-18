import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu } from '../models/menu';


const recipeURL = environment.BACKEND_URL + '/recipes'
@Injectable({
  providedIn: 'root'
})


export class MenuService {

  constructor(private httpClient: HttpClient) { }

  getMenus(page: number): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(recipeURL+`?page=${page}`);
  }

  getMenuById(id: string): Observable<Menu> {
    return this.httpClient.get<Menu>(recipeURL+`/${id}`);
  }
}
