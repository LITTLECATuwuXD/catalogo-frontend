import { Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies';
import { MovieComponent } from './movie/movie';

export const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' }, // Redirige a movies por defecto
  { path: 'movies', component: MoviesComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: '**', redirectTo: '/movies' } // Ruta comodín
];
