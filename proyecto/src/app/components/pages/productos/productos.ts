import { Component, signal, Injectable } from '@angular/core';
import { Header } from '../../header/header';
import { Footer } from '../../footer/footer';
import { Card } from '../../card/card';
import { ProductosService } from '../../../services/productos-service';

@Component({
  selector: 'app-productos',
  imports: [Card],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos {

  productos;
  
  constructor(private productosService: ProductosService) { 
    this.productos = this.productosService.productos;
  }

}
