import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { Router } from '@angular/router';
import { PedidosService } from '../../services/pedidos-service';
import { AuthService } from '../../services/auth-service';
@Component({
  selector: 'app-carrito',
  imports: [],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css'],
})
export class Carrito {

  private cartService = inject(CartService);
  private router = inject(Router);
  private pedidosService = inject(PedidosService);
  private authService = inject(AuthService);

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
    const user = this.authService.getUser();
    if (!user) return;

    const numeroFolio = Math.floor(10000000 + Math.random() * 90000000);

    const pedido = {
      userId: user.uid,
      username: user.username,
      folio: numeroFolio,
      totalProductos: this.cartService.totalItems(),
      productos: this.items(),
      total: this.total(),
    };

    this.pedidosService.crearPedido(pedido).subscribe({
      next: () => {
        this.folio.set(numeroFolio);
        this.cartService.vaciarCarrito();
      },
      error: (e) => console.error('Error al guardar pedido:', e),
    });
  }

}
