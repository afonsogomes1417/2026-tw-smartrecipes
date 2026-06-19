import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SearchComponent } from './features/search/search.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { PantryComponent } from './features/pantry/pantry.component';
import { RecipeDetailComponent } from './features/recipe-detail/recipe-detail.component'; // ◄ ADICIONA ESTA LINHA

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pesquisar', component: SearchComponent },
  { path: 'favoritos', component: FavoritesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registar', component: RegisterComponent },
  { path: 'dispensa', component: PantryComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent }, // ◄ ADICIONA ESTA LINHA (Confirma se o teu grupo usou 'recipe/:id' ou 'detalhes/:id')
  { path: '**', redirectTo: '' }
];