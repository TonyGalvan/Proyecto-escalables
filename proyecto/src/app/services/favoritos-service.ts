import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/favoritos';

  getFavoritos(userId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }

  agregarFavorito(favorito: any) {
    return this.http.post(this.apiUrl, favorito);
  }

  eliminarFavorito(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}