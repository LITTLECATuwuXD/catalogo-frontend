import { Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies';
import { MovieComponent } from './movie/movie';

export const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', component: MoviesComponent },
  { path: 'movie/:id', component: MovieComponent }
];
