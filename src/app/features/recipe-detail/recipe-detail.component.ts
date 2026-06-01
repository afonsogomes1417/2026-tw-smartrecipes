import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MealService } from '../../core/services/meal.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { AuthService } from '../../core/services/auth.service';
import { Meal } from '../../core/models/meal.model';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  meal: Meal | null = null;
  isLoading = true;
  ingredients: { name: string; measure: string }[] = [];
  isFavorite = false;
  favoriteMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mealService: MealService,
    private favoritesService: FavoritesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mealService.getMealById(id).subscribe(res => {
        if (res.meals) {
          this.meal = res.meals[0];
          this.extractIngredients();
          this.checkFavorite();
        }
        this.isLoading = false;
      });
    }
  }

  extractIngredients() {
    if (!this.meal) return;
    for (let i = 1; i <= 20; i++) {
      const ingredient = (this.meal as any)[`strIngredient${i}`];
      const measure = (this.meal as any)[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        this.ingredients.push({ name: ingredient, measure: measure || '' });
      }
    }
  }

  checkFavorite() {
    if (!this.authService.isLoggedIn()) return;
    this.favoritesService.getFavorites().subscribe(res => {
      this.isFavorite = res.favorites.some(f => f.meal_id === this.meal?.idMeal);
    });
  }

  toggleFavorite() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    if (!this.meal) return;

    if (this.isFavorite) {
      this.favoritesService.removeFavorite(this.meal.idMeal).subscribe({
        next: () => {
          this.isFavorite = false;
          this.favoriteMessage = 'Removido dos favoritos.';
          setTimeout(() => this.favoriteMessage = '', 2500);
        }
      });
    } else {
      this.favoritesService.addFavorite({
        meal_id: this.meal.idMeal,
        meal_name: this.meal.strMeal,
        meal_thumb: this.meal.strMealThumb,
        meal_category: this.meal.strCategory,
        meal_area: this.meal.strArea
      }).subscribe({
        next: () => {
          this.isFavorite = true;
          this.favoriteMessage = 'Adicionado aos favoritos!';
          setTimeout(() => this.favoriteMessage = '', 2500);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/search']);
  }
}