// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies';
import { MovieComponent } from './movie/movie';
import { MovieCreateComponent } from './movie-create/movie-create';
import { MovieEditComponent } from './movie-edit/movie-edit';

export const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', component: MoviesComponent },
  { path: 'movie/:id', component: MovieComponent },
  // Nuevas rutas
  { path: 'movie-create', component: MovieCreateComponent },
  { path: 'movie/edit/:id', component: MovieEditComponent },
  { path: '**', redirectTo: 'movies' } // Ruta comodín
];
