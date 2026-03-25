import { Component } from '@angular/core';
import { Header } from '../../header/header';
import { Footer } from '../../footer/footer';
import { Card } from '../../card/card';

@Component({
  selector: 'app-nosotros',
  imports: [Header, Footer, Card],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css',
})
export class Nosotros {

}
