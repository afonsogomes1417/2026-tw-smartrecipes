import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FavoritesService, FavoriteMeal } from '../../core/services/favorites.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  favorites: FavoriteMeal[] = [];
  isLoading = true;

  constructor(
    private favoritesService: FavoritesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadFavorites();
  }

  loadFavorites() {
    this.favoritesService.getFavorites().subscribe({
      next: (res) => {
        this.favorites = res.favorites;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  removeFavorite(mealId: string) {
    this.favoritesService.removeFavorite(mealId).subscribe({
      next: () => {
        this.favorites = this.favorites.filter(f => f.meal_id !== mealId);
      }
    });
  }

  goToDetail(id: string) {
    this.router.navigate(['/recipe', id]);
  }
}
