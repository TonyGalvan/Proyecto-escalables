import { Component, inject, Input } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { FavoritosService } from '../../services/favoritos-service';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() producto: any;

  private cartService = inject(CartService);
  private favoritosService = inject(FavoritosService);
  private authService = inject(AuthService);
  private router = inject(Router);

  agregar() {
    this.cartService.agregarItem(this.producto);
  }

  agregarFavorito() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const user = this.authService.getUser();
    if (!user) return;

    const favorito = {
      userId: user.uid,
      username: user.username,
      nombre: this.producto.nombre,
      imagen: this.producto.imagen,
      precio: this.producto.precio,
    };

    this.favoritosService.agregarFavorito(favorito).subscribe({
      next: () => console.log('Agregado a favoritos'),
      error: (e) => console.error(e),
    });
  }
}
