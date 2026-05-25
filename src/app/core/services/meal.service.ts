import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MealSearchResponse, MealListResponse } from '../models/meal.model';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private readonly apiUrl = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}

  searchMeals(query: string): Observable<MealSearchResponse> {
    return this.http.get<MealSearchResponse>(
      `${this.apiUrl}/search.php?s=${query}`
    );
  }

  getMealById(id: string): Observable<MealSearchResponse> {
    return this.http.get<MealSearchResponse>(
      `${this.apiUrl}/lookup.php?i=${id}`
    );
  }

  getMealsByCategory(category: string): Observable<MealListResponse> {
    return this.http.get<MealListResponse>(
      `${this.apiUrl}/filter.php?c=${category}`
    );
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categories.php`);
  }

  getRandomMeal(): Observable<MealSearchResponse> {
    return this.http.get<MealSearchResponse>(`${this.apiUrl}/random.php`);
  }
}