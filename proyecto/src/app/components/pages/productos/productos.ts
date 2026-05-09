import { Component } from '@angular/core';
import { Header } from '../../header/header';
import { Footer } from '../../footer/footer';
import { Card } from '../../card/card';

@Component({
  selector: 'app-productos',
  imports: [Card],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos {

  productos = [
    {
      nombre: 'Pastel 3 Leches 4 Estaciones de Fruta Rectangular Grande',
      imagen: 'imagenes/pastel_2.jpg',
      descripcion: 'Pan de vainilla de 3 leches, relleno de crema de nata y almendra fileteada, cubierto de fruta natural.',
      precio: 300
    },
    {
      nombre: 'Pastel 3 Leches Rosetones Rectangular Grande',
      imagen: 'imagenes/pastel.jpg',
      descripcion: 'Pan de chocolate, relleno de crema y mermelada de fresa, cubierto de crema de chocolate y decorado con fresa natural.',
      precio: 250
    },
    {
      nombre: 'Pastel 3 Leches 4 Estaciones de Fruta Grande',
      imagen: 'imagenes/pastel_4.jpg',
      descripcion: 'Pan de vainilla de 3 leches, relleno de crema de nata y almendra fileteada, bubierta de fruta.',
      precio: 350
    }
  ]

}
