import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'catalogo-frontend';
  fondoActual: string = 'bg-principal'; // Fondo por defecto

  constructor(private router: Router) {}

  ngOnInit() {
    // Escuchamos los cambios de ruta para actualizar el fondo
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Si la URL contiene '/movie/' (detalle), usamos el fondo de detalle
      if (event.urlAfterRedirects.includes('/movie/')) {
        this.fondoActual = 'bg-detalle';
      } else {
        this.fondoActual = 'bg-principal';
      }
    });
  }
}
