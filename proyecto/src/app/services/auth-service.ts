import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './cart-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

  private _token = signal<string | null>(localStorage.getItem("token"));

  //señal computada para obtener valores que depende de otros valores
  public isLoggedIn = computed(() => !!this._token());
  public isLoading = signal(false);
  public errorMessage = signal<string | null>(null);

  private cartService = inject(CartService);

  getRol(): string | null {
    const token = this._token();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role ?? null;
  }

  public isAdmin = computed(() => this.getRol() === 'admin');

  getToken() {
    return this._token();
  }

  login(username: string, password: string): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.http.post<{ token: string }>('http://localhost:8080/api/auth/login',
      { username, password }).subscribe(
        {
          next: (response) => {
            localStorage.setItem("token", response.token);
            this._token.set(response.token);
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.log(error);
            this.errorMessage.set(error.error.msg);
          },
          complete: () => {
            this.isLoading.set(false);
          }
        }
      )

  }

  logout() {
    this._token.set(null);
    localStorage.removeItem("token");
    this.cartService.vaciarCarrito();
    this.router.navigate(['/home']);
  }

  getUser(): { uid: string, username: string } | null {
    const token = this._token();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { uid: payload.uid, username: payload.username };
  }


}
