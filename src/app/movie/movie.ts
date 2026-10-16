import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.html',
  imports: [CommonModule],
  styleUrls: ['./movie.css']
})
export class MovieComponent implements OnInit {
  movie: any = null;
  private apiUrl = 'http://localhost:8000/api/movies';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<any>(`${this.apiUrl}/${id}`).subscribe(data => {
      this.movie = data;
    });
  }
}
