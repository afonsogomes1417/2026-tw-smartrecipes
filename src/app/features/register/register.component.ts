import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Preenche todos os campos.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'As passwords não coincidem.';
      return;
    }
    if (this.password.length < 6) {
      this.errorMessage = 'A password deve ter pelo menos 6 caracteres.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao criar conta.';
        this.isLoading = false;
      }
    });
  }
}
