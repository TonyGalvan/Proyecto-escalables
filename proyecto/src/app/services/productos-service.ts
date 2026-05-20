import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth-service';

interface Productos {
  _id?: string;
  nombre: string;
  imagen: string;
  descripcion: string;
  precio: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  
  private http = inject(HttpClient);

  private _productos = signal<Productos[]>([]);
  public productos = this._productos.asReadonly();


  constructor() {
    this.fetchProductos();
  }

  fetchProductos(): void {
    this.http.get<Productos[]>("http://localhost:8080/api/productos").subscribe({
      next: (response: Productos[]) => {
        this._productos.set(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  agregarProducto(producto: any) {
    return this.http.post('http://localhost:8080/api/productos', producto);
  }
  eliminarProducto(id: string) {
    return this.http.delete(`http://localhost:8080/api/productos/${id}`);
  }
  
}