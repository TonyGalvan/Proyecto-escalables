import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Productos } from './components/pages/productos/productos';
import { Nosotros } from './components/pages/nosotros/nosotros';
import { Sucursales } from './components/pages/sucursales/sucursales';
import { Login } from './components/pages/login/login';
import { AdminProductos } from './components/pages/admin-productos/admin-productos';
import { authGuard } from './guards/auth-guard';
import { loginGuard } from './guards/login-guard';
import { adminGuard } from './guards/admin-guard';
import { Carrito } from './components/carrito/carrito';
import { Favoritos } from './components/favoritos/favoritos';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: 'full' },
    { path: 'home', component: Home},
    { path: 'nosotros', component: Nosotros},
    { path: 'sucursales', component: Sucursales},
    { path: 'productos', component: Productos},
    { path: 'carrito', component: Carrito, canActivate: [authGuard] },
    { path: 'login', component: Login, canActivate: [loginGuard]},
    { path: 'admin-productos', component: AdminProductos, canActivate: [authGuard, adminGuard] },
    { path: 'favoritos', component: Favoritos, canActivate: [authGuard] },
];
