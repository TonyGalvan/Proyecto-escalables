// cart-service.ts
import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../interfaces/cart-item';

@Injectable({ providedIn: 'root' })
export class CartService {

  private _items = signal<CartItem[]>(
    JSON.parse(localStorage.getItem('carrito') ?? '[]')
  );

  public items = this._items.asReadonly();

  public total = computed(() =>
    this._items().reduce((acc, item) => acc + item.precio * item.cantidad, 0)
  );

  public totalItems = computed(() =>
    this._items().reduce((acc, item) => acc + item.cantidad, 0)
  );

  private guardarStorage() {
    localStorage.setItem('carrito', JSON.stringify(this._items()));
  }

  agregarItem(producto: any) {
    const items = this._items();
    const existe = items.find(i => i._id === producto._id);

    if (existe) {
      // Si ya existe, aumenta la cantidad
      this._items.set(items.map(i =>
        i._id === producto._id ? { ...i, cantidad: i.cantidad + 1 } : i
      ));
    } else {
      // Si no existe, lo agrega con cantidad 1
      this._items.set([...items, { ...producto, cantidad: 1 }]);
    }

    this.guardarStorage();
  }

  eliminarUno(id: string) {
    const items = this._items();
    const item = items.find(i => i._id === id);

    if (item && item.cantidad > 1) {
      this._items.set(items.map(i =>
        i._id === id ? { ...i, cantidad: i.cantidad - 1 } : i
      ));
    } else {
      this._items.set(items.filter(i => i._id !== id));
    }

    this.guardarStorage();
  }

  vaciarCarrito() {
    this._items.set([]);
    this.guardarStorage();
  }
}