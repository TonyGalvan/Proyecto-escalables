import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { Carrusel } from "./components/carrusel/carrusel";
import { Card } from './components/card/card';
import { Content } from "./components/content/content";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Carrusel, Card, Content],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('proyecto');
pastel: any;
}
