import { Component } from '@angular/core';
import { Card } from "../../card/card";
import { Header } from '../../header/header';
import { Footer } from '../../footer/footer';
import { Carrusel } from "../../carrusel/carrusel";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [Card, Carrusel, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
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
