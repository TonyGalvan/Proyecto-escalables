import { Component, OnInit } from '@angular/core';
import { Card } from "../../card/card";
import { Header } from '../../header/header';
import { Footer } from '../../footer/footer';
import { Carrusel } from "../../carrusel/carrusel";
import { RouterLink } from "@angular/router";
import { ProductosService } from '../../../services/productos-service';

@Component({
  selector: 'app-home',
  imports: [Card, Carrusel, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  productos;
  
  constructor(private productosService: ProductosService) { 
    this.productos = this.productosService.productos;
  }

  ngOnInit(): void {
    this.productosService.fetchProductos();
  }
}
