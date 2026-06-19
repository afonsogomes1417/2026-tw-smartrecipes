import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PantryService, PantryItem } from '../../core/services/pantry.service';

@Component({
  selector: 'app-pantry',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="max-width: 600px; margin: 40px auto; padding: 20px; font-family: 'Segoe UI', sans-serif;">
      
      <h2 style="color: #2D6A4F; font-weight: 800; margin-bottom: 8px;">
        🔍 A Minha Dispensa Inteligente
      </h2>
      <p style="color: #40916C; margin-bottom: 24px; font-size: 1rem;">
        Adiciona os ingredientes que tens em casa para gerires o teu stock local.
      </p>
      
      <div style="display: flex; width: 100%; margin-bottom: 24px;">
        <input 
          #box
          placeholder="Ex: Chicken, Tomato, Rice..." 
          style="flex: 1; padding: 14px 20px; border-radius: 50px 0 0 50px; border: 2px solid rgba(45, 106, 79, 0.3); background: #FFFFFF; color: #1B4332; font-size: 1rem; outline: none;"
          (keyup.enter)="add(box.value); box.value=''"
        />
        <button 
          (click)="add(box.value); box.value=''" 
          type="button"
          style="padding: 14px 28px; background-color: #2D6A4F; border: 2px solid #2D6A4F; border-radius: 0 50px 50px 0; color: white; cursor: pointer; font-weight: 600; font-size: 1rem; min-width: 120px;"
        >
          Adicionar
        </button>
      </div>

      <div style="background: #FFFFFF; padding: 24px; border-radius: 20px; border: 1px solid rgba(45, 106, 79, 0.15); box-shadow: 0 4px 15px rgba(27, 67, 50, 0.04);">
        <h3 style="margin-top: 0; border-bottom: 1px solid rgba(45, 106, 79, 0.1); padding-bottom: 12px; color: #2D6A4F; font-weight: 700;">
          Ingredientes no Frigorífico:
        </h3>
        
        @if (!items || items.length === 0) {
          <p style="color: #40916C; margin: 16px 0 0 0; font-size: 1rem;">A tua dispensa está vazia.</p>
        } @else {
          <ul style="list-style: none; padding: 0; margin: 0;">
            @for (item of items; track $index) {
              <li style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(45, 106, 79, 0.1); color: #1B4332;">
                <span style="text-transform: capitalize; font-size: 16px; font-weight: 500;">✨ {{ item.ingredient_name }}</span>
                <button (click)="remove(item.id!)" type="button" style="background: rgba(220, 38, 38, 0.1); border: 1px solid #f87171; padding: 6px 14px; border-radius: 20px; color: #b91c1c; cursor: pointer; font-weight: 600;">
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

  constructor(private pantryService: PantryService) {}

  ngOnInit() {
    this.loadPantry();
  }

  loadPantry() {
    this.pantryService.getPantry().subscribe({
      next: (res: any) => {
        this.items = res?.pantry || (Array.isArray(res) ? res : []);
      },
      error: (err) => console.error('Erro ao carregar a dispensa:', err)
    });
  }

  add(value: string) {
    console.log('Botão clicado! Valor recebido do input:', value);

    if (!value || !value.trim()) {
      console.log('O valor continua vazio.');
      return;
    }
    
    this.pantryService.addIngredient(value.trim()).subscribe({
      next: () => {
        console.log('Adicionado com sucesso!');
        this.loadPantry();
      },
      error: (err) => console.error('Erro no POST:', err)
    });
  }

  remove(id: number) {
    if (!id) return;
    this.pantryService.removeIngredient(id).subscribe({
      next: () => this.loadPantry(),
      error: (err) => console.error('Erro ao remover:', err)
    });
  }
}