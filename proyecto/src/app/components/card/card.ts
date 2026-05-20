import { Component, inject, Input } from '@angular/core';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() producto: any;

  private cartService = inject(CartService);

  agregar() {
    this.cartService.agregarItem(this.producto);
  }
}
