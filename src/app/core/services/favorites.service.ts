import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

export interface FavoriteMeal {
  id?: number;
  meal_id: string;
  meal_name: string;
  meal_thumb: string;
  meal_category: string;
  meal_area: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly apiUrl = 'http://localhost:3000/api/favorites';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  }

  getFavorites() {
    return this.http.get<{ favorites: FavoriteMeal[] }>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  addFavorite(meal: FavoriteMeal) {
    return this.http.post(this.apiUrl, meal, {
      headers: this.getHeaders()
    });
  }

  removeFavorite(mealId: string) {
    return this.http.delete(`${this.apiUrl}/${mealId}`, {
      headers: this.getHeaders()
    });
  }
}