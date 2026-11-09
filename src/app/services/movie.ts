import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Ajusta la ruta

export interface Movie {
  id: number;
  title: string;
  synopsis: string;
  year: number;
  cover: string;
  created_at?: string;
  updated_at?: string;
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  private apiUrl = `${environment.apiUrl}/movies`;

  constructor(private http: HttpClient) {}

  // ... resto del código igual

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  getMovie(id: number | string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

  createMovie(payload: FormData | Partial<Movie>): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, payload);
  }

  updateMovie(id: number | string, payload: FormData | Partial<Movie>): Observable<Movie> {
    // Laravel no procesa FormData con PUT directamente; usar _method=PUT
    if (payload instanceof FormData) {
      payload.append('_method', 'PUT');
      return this.http.post<Movie>(`${this.apiUrl}/${id}`, payload);
    }
    return this.http.put<Movie>(`${this.apiUrl}/${id}`, payload);
  }

  deleteMovie(id: number | string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
