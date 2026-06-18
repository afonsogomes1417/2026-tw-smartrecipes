import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PantryService, PantryItem } from '../../core/services/pantry.service';

@Component({
  selector: 'app-pantry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="max-width: 600px; margin: 40px auto; padding: 20px; color: white; font-family: sans-serif;">
      <h2 style="color: #9c27b0;">🍳 A Minha Dispensa Inteligente</h2>
      <p style="color: #8a99ad;">Adiciona os ingredientes que tens em casa para gerires o teu stock local.</p>
      
      <div style="display: flex; gap: 10px; margin-bottom: 20px;">
        <input 
          [(ngModel)]="newIngredient" 
          placeholder="Ex: Chicken, Tomato, Rice..." 
          style="flex: 1; padding: 12px; border-radius: 6px; border: 1px solid #2a3b50; background: #1a2635; color: white;"
          (keyup.enter)="add()"
        />
        <button (click)="add()" style="padding: 12px 24px; background: #9c27b0; border: none; border-radius: 6px; color: white; cursor: pointer; font-weight: bold;">
          Adicionar
        </button>
      </div>

      <div style="background: #141d26; padding: 20px; border-radius: 8px; border: 1px solid #2a3b50;">
        <h3 style="margin-top: 0; border-bottom: 1px solid #2a3b50; padding-bottom: 10px;">Ingredientes no Frigorífico:</h3>
        
        @if (items.length === 0) {
          <p style="color: #657786; margin: 10px 0 0 0;">A tua dispensa está vazia.</p>
        } @else {
          <ul style="list-style: none; padding: 0; margin: 0;">
            @for (item of items; track $index) {
              <li style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #2a3b50;">
                <span style="text-transform: capitalize; font-size: 16px;">✨ {{ item.ingredient_name }}</span>
                <button (click)="remove(item.id!)" style="background: #e0245e; border: none; padding: 6px 12px; border-radius: 4px; color: white; cursor: pointer; font-weight: bold;">
                  Remover
                </button>
              </li>
            }
          </ul>
        }
      </div>
    </div>
  `
})
export class PantryComponent implements OnInit {
  items: PantryItem[] = [];
  newIngredient: string = '';

  constructor(private pantryService: PantryService) {}

  ngOnInit() {
    this.loadPantry();
  }

  loadPantry() {
    this.pantryService.getPantry().subscribe({
      next: (res) => {
        this.items = res.pantry || [];
      },
      error: (err) => console.error('Erro ao carregar a dispensa:', err)
    });
  }

  add() {
    if (!this.newIngredient.trim()) return;
    this.pantryService.addIngredient(this.newIngredient).subscribe({
      next: () => {
        this.newIngredient = '';
        this.loadPantry();
      },
      error: (err) => console.error('Erro ao adicionar:', err)
    });
  }

  remove(id: number) {
    this.pantryService.removeIngredient(id).subscribe({
      next: () => {
        this.loadPantry();
      },
      error: (err) => console.error('Erro ao remover:', err)
    });
  }
}