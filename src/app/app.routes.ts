import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Productos } from './components/pages/productos/productos';
import { Nosotros } from './components/pages/nosotros/nosotros';
import { Sucursales } from './components/pages/sucursales/sucursales';
import { Login } from './components/pages/login/login';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'nosotros', component: Nosotros},
    { path: 'sucursales', component: Sucursales},
    { path: 'productos', component: Productos},
    { path: 'login', component: Login},
];
