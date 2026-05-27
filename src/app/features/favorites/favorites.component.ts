import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface FavoriteMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
}

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  favorites: FavoriteMeal[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    const saved = localStorage.getItem('smartrecipes-favorites');
    this.favorites = saved ? JSON.parse(saved) : [];
  }

  removeFavorite(id: string) {
    this.favorites = this.favorites.filter(f => f.idMeal !== id);
    localStorage.setItem('smartrecipes-favorites', JSON.stringify(this.favorites));
  }

  goToDetail(id: string) {
    this.router.navigate(['/recipe', id]);
  }
}
