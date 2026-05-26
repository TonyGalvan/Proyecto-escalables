import { Component, inject, OnInit, signal } from '@angular/core';
import { FavoritosService } from '../../services/favoritos-service';
import { AuthService } from '../../services/auth-service';
import { PedidosService } from '../../services/pedidos-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-favoritos',
  imports: [DatePipe],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
})
export class Favoritos implements OnInit {
  private favoritosService = inject(FavoritosService);
  private authService = inject(AuthService);
  private pedidosService = inject(PedidosService);

  favoritos = signal<any[]>([]);
  pedidos = signal<any[]>([]);

  ngOnInit() {
    const user = this.authService.getUser();
    if (!user) return;

    this.favoritosService.getFavoritos(user.uid).subscribe({
      next: (data) => this.favoritos.set(data),
      error: (e) => console.error(e),
    });

    this.pedidosService.getPedidos(user.uid).subscribe({
      next: (data) => this.pedidos.set(data),
      error: (e) => console.error(e),
    });
  }

  eliminar(id: string) {
    if (!confirm('¿Eliminar de favoritos?')) return;

    this.favoritosService.eliminarFavorito(id).subscribe({
      next: () => {
        this.favoritos.set(this.favoritos().filter(f => f._id !== id));
      },
      error: (e) => console.error(e),
    });
  }
}
