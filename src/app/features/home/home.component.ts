import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MealService } from '../../core/services/meal.service';
import { Meal } from '../../core/models/meal.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  randomMeals: Meal[] = [];
  isLoading = true;

  constructor(private mealService: MealService, private router: Router) {}

  ngOnInit() {
    this.loadRandomMeals();
  }

  loadRandomMeals() {
    this.isLoading = true;
    const requests = Array.from({ length: 8 }, () =>
      this.mealService.getRandomMeal()
    );

    let loaded = 0;
    requests.forEach(req => {
      req.subscribe(res => {
        if (res.meals) {
          this.randomMeals.push(res.meals[0]);
        }
        loaded++;
        if (loaded === requests.length) {
          this.isLoading = false;
        }
      });
    });
  }

  goToDetail(id: string) {
    this.router.navigate(['/recipe', id]);
  }

  goToSearch() {
    this.router.navigate(['/search']);
  }
}