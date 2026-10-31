import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
  id: number;
  title: string;
  synopsis: string;
  year: number;
  cover: string;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:8000/api/movies';

  constructor(private http: HttpClient) {}

  // GET /api/movies — índice (equivale al index de Laravel)
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  // GET /api/movies/:id — detalle (equivale al show de Laravel)
  getMovie(id: number | string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

  // POST /api/movies — crear (equivale al store)
  createMovie(movie: Partial<Movie>): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie);
  }

  // PUT /api/movies/:id — actualizar (equivale al update)
  updateMovie(id: number | string, movie: Partial<Movie>): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/${id}`, movie);
  }

  // DELETE /api/movies/:id — eliminar (equivale al destroy)
  deleteMovie(id: number | string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
