import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.html',
  imports: [CommonModule, RouterLink],
  styleUrls: ['./movies.css']
})
export class MoviesComponent implements OnInit {
  movies: any[] | undefined = undefined;
  private apiUrl = 'http://localhost:8000/api/movies';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('MoviesComponent ngOnInit ejecutado');
    this.http.get<any>(this.apiUrl).subscribe({
      next: (response) => {
        console.log('Respuesta API:', response);
        this.movies = Array.isArray(response) ? response : (response.data || []);
        console.log('movies asignado:', this.movies);
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
