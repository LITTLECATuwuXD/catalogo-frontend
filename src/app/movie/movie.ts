import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie',
  imports: [RouterLink],
  templateUrl: './movie.html',
  styleUrls: ['./movie.css']
})
export class MovieComponent implements OnInit {
  movie: any = null;
  loading = true;
  error: string | null = null;
  private apiUrl = 'http://localhost:8000/api/movies';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('MovieComponent ngOnInit, id =', id);

    if (!id) {
      this.error = 'No se recibió ID';
      this.loading = false;
      return;
    }

    this.http.get<any>(`${this.apiUrl}/${id}`).subscribe({
      next: (data) => {
        console.log('Respuesta detalle:', data);
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
}
