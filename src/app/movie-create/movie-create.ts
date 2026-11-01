// src/app/movie-create/movie-create.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para formularios
import { Router, RouterLink } from '@angular/router';
import { MovieService, Movie } from '../services/movie';

@Component({
  selector: 'app-movie-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './movie-create.html',
  styleUrls: ['./movie-create.css']
})
export class MovieCreateComponent {
  // Objeto para enlazar con el formulario
  newMovie: Partial<Movie> = {
    title: '',
    synopsis: '',
    year: new Date().getFullYear(),
    cover: ''
  };

  errorMessage: string | null = null;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.movieService.createMovie(this.newMovie).subscribe({
      next: () => {
        // Redirigir a la lista si se guarda correctamente
        this.router.navigate(['/movies']);
      },
      error: (err) => {
        console.error('Error al crear película:', err);
        this.errorMessage = 'Hubo un error al guardar la película.';
      }
    });
  }
}
