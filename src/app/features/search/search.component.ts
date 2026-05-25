import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MealService } from '../../core/services/meal.service';
import { Meal } from '../../core/models/meal.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm = '';
  meals: Meal[] = [];
  isLoading = false;
  searched = false;

  constructor(private mealService: MealService, private router: Router) {}

  search() {
    if (!this.searchTerm.trim()) return;
    this.isLoading = true;
    this.searched = true;
    this.mealService.searchMeals(this.searchTerm).subscribe(res => {
      this.meals = res.meals || [];
      this.isLoading = false;
    });
  }

  goToDetail(id: string) {
    this.router.navigate(['/recipe', id]);
  }
}