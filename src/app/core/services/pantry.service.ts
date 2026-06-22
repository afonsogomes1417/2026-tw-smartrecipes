import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

export interface PantryItem {
  id?: number;
  ingredient_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class PantryService {
  // 👇 Alterado para apontar exatamente para a rota limpa do teu NestJS
  private readonly apiUrl = 'http://localhost:3000/api/pantry';
  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    // Procura o token diretamente no AuthService ou tenta lê-lo do localStorage caso tenha limpado
    const token = this.authService.getToken() || localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getPantry() {
    return this.http.get<{ pantry: PantryItem[] }>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  addIngredient(name: string) {
    return this.http.post(this.apiUrl, { ingredient_name: name }, {
      headers: this.getHeaders()
    });
  }

  removeIngredient(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}