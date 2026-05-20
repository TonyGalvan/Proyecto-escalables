import { Component, inject, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    console.log('Rol:', this.authService.getRol());
    console.log('isAdmin:', this.authService.isAdmin());
  }
}