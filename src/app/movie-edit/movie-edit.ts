// src/app/movie-edit/movie-edit.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService, Movie } from '../services/movie';

@Component({
  selector: 'app-movie-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './movie-edit.html',
  styleUrls: ['./movie-edit.css']
})
export class MovieEditComponent implements OnInit {
  movie: Partial<Movie> = {
    title: '',
    synopsis: '',
    year: 0,
    cover: ''
  };
  movieId: string | null = null;
  errorMessage: string | null = null;
  loading = true;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Obtenemos el ID de la URL (ej: /movie/edit/1)
    this.movieId = this.route.snapshot.paramMap.get('id');

    if (this.movieId) {
      // Cargamos los datos actuales de la película
      this.movieService.getMovie(this.movieId).subscribe({
        next: (data: any) => {
          // Ajuste por si la API devuelve un objeto anidado en 'data'
          this.movie = data.data || data;
          this.loading = false;
          this.cdr.detectChanges(); // Forzar actualización de la vista
        },
        error: (err) => {
          this.errorMessage = 'Error al cargar la película.';
          this.loading = false;
        }
      });
    }
  }

  onSubmit(): void {
    if (!this.movieId) return;

    this.movieService.updateMovie(this.movieId, this.movie).subscribe({
      next: () => {
        this.router.navigate(['/movies']);
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        this.errorMessage = 'Hubo un error al actualizar la película.';
      }
    });
  }
}
