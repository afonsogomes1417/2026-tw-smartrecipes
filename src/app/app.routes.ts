import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SearchComponent } from './features/search/search.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { PantryComponent } from './features/pantry/pantry.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // ◄ A Home volta a ser a página inicial padrão
  { path: 'pesquisar', component: SearchComponent },
  { path: 'favoritos', component: FavoritesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registar', component: RegisterComponent },
  { path: 'dispensa', component: PantryComponent }, // ◄ A tua dispensa fica nesta rota dedicada
  { path: '**', redirectTo: '' }
];