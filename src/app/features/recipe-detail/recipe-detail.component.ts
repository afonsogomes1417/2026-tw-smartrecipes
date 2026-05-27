import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MealService } from '../../core/services/meal.service';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mealService: MealService
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
    const saved = localStorage.getItem('smartrecipes-favorites');
    const favorites = saved ? JSON.parse(saved) : [];
    this.isFavorite = favorites.some((f: any) => f.idMeal === this.meal?.idMeal);
  }

  toggleFavorite() {
    if (!this.meal) return;
    const saved = localStorage.getItem('smartrecipes-favorites');
    let favorites = saved ? JSON.parse(saved) : [];

    if (this.isFavorite) {
      favorites = favorites.filter((f: any) => f.idMeal !== this.meal?.idMeal);
      this.isFavorite = false;
    } else {
      favorites.push({
        idMeal: this.meal.idMeal,
        strMeal: this.meal.strMeal,
        strMealThumb: this.meal.strMealThumb,
        strCategory: this.meal.strCategory,
        strArea: this.meal.strArea
      });
      this.isFavorite = true;
    }

    localStorage.setItem('smartrecipes-favorites', JSON.stringify(favorites));
  }

  goBack() {
    this.router.navigate(['/search']);
  }
}