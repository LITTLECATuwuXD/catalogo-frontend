import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { MoviesComponent } from './movies/movies';
import { MovieComponent } from './movie/movie';
import { MovieCreateComponent } from './movie-create/movie-create';
import { MovieEditComponent } from './movie-edit/movie-edit';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' }, // Home real
  { path: 'movies', component: MoviesComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'movie-create', component: MovieCreateComponent },
  { path: 'movie/edit/:id', component: MovieEditComponent },
  { path: '**', redirectTo: '' }
];
