import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieService, Movie } from '../services/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.html',
  imports: [CommonModule, RouterLink],
  styleUrls: ['./movies.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] | undefined = undefined;

  constructor(
    private movieService: MovieService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe({
      next: (response) => {
        this.movies = Array.isArray(response) ? response : [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al consultar /api/movies:', err);
        this.movies = [];
        this.cdr.detectChanges();
      }
    });
  }
}
