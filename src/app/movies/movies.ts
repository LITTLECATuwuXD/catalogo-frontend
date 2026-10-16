import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.html',
  imports: [CommonModule],
  styleUrls: ['./movies.css']
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];
  private apiUrl = 'http://localhost:8000/api/movies';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.movies = data;
    });
  }
}
