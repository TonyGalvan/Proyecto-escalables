import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-carrito',
  imports: [],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css'],
})
export class Carrito {

  private cartService = inject(CartService);
  private router = inject(Router);

  items = this.cartService.items;
  total = this.cartService.total;

  folio = signal<number | null>(null);


  eliminarUno(id: string) {
    this.cartService.eliminarUno(id);
  }

  vaciarCarrito() {
    this.cartService.vaciarCarrito();
  }



  seguirComprando() {
    this.router.navigate(['/productos']);
  }

  pagar() {
    const numeroFolio = Math.floor(10000000 + Math.random() * 90000000);
    this.folio.set(numeroFolio);
    this.cartService.vaciarCarrito();
  }

}
