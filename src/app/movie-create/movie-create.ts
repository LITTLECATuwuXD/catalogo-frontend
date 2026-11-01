// src/app/movie-create/movie-create.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  newMovie: Partial<Movie> = {
    title: '',
    synopsis: '',
    year: new Date().getFullYear(),
    cover: ''
  };

  selectedFile: File | null = null;
  errorMessage: string | null = null;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] || null;
  }

  onSubmit(): void {
    this.errorMessage = null;

    const formData = new FormData();
    formData.append('title', this.newMovie.title || '');
    formData.append('synopsis', this.newMovie.synopsis || '');
    formData.append('year', String(this.newMovie.year ?? new Date().getFullYear()));

    if (this.selectedFile) {
      formData.append('cover', this.selectedFile);
    } else {
      formData.append('cover', this.newMovie.cover || '');
    }

    this.movieService.createMovie(formData).subscribe({
      next: () => this.router.navigate(['/movies']),
      error: (err) => {
        console.error('Error al crear película:', err);
        this.errorMessage = 'Hubo un error al guardar la película.';
      }
    });
  }
}
