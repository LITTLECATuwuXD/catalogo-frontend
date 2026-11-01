import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService, Movie } from '../services/movie';

@Component({
  selector: 'app-movie',
  standalone: true,
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
    private router: Router,
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
      next: (data: any) => {
        this.movie = data.data || data;
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

  getCoverUrl(cover: string): string {
    if (!cover) return 'https://via.placeholder.com/300x450?text=Sin+portada';
    // Si es URL absoluta, se usa tal cual
    if (cover.startsWith('http://') || cover.startsWith('https://')) {
      return cover;
    }
    // Si es ruta relativa del storage de Laravel
    return `http://localhost:8000/storage/${cover}`;
  }

  confirmDelete(): void {
    if (!this.movie) return;
    if (confirm(`¿Seguro que deseas eliminar "${this.movie.title}"?`)) {
      this.movieService.deleteMovie(this.movie.id).subscribe({
        next: () => {
          alert('Película eliminada correctamente.');
          this.router.navigate(['/movies']);
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('Hubo un error al eliminar la película.');
        }
      });
    }
  }
}
