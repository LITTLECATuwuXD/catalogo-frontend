import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService, Movie } from '../services/movie';

@Component({
  selector: 'app-movie',
  imports: [CommonModule, RouterLink],
  templateUrl: './movie.html',
  styleUrls: ['./movie.css']
})
export class MovieComponent implements OnInit {
  movie: Movie | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'No se recibió ID';
      this.loading = false;
      return;
    }

    this.movieService.getMovie(id).subscribe({
      next: (data) => {
        this.movie = (data as any).data || data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar película:', err);
        this.error = 'Error al cargar la película';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
