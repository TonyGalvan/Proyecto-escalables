import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PedidosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/pedidos';

  getPedidos(userId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }

  crearPedido(pedido: any) {
    return this.http.post(this.apiUrl, pedido);
  }
}