import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductosService } from '../../../services/productos-service';
import { Card } from "../../card/card";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-admin-productos',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-productos.html',
  styleUrl: './admin-productos.css',
})
export class AdminProductos implements OnInit {

  private productosService = inject(ProductosService);
  private fb = inject(FormBuilder);

  productos = this.productosService.productos;

  //productos;
  //productoForm;

  nombreImagen: string = '';

  productoForm = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    precio: ['', Validators.required],
  });

  /*
    constructor(private productosService: ProductosService,
      private fb: FormBuilder
    ) {
      this.productos = this.productosService.productos;
      this.productoForm = this.fb.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        precio: ['', Validators.required],
        imagen: ['', Validators.required],
      });
    }*/

  ngOnInit(): void {
    this.productosService.fetchProductos();
  }


  onImagenSeleccionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.nombreImagen = 'uploads/' + input.files[0].name;
    }
  }

  agregarProducto() {
    if (this.productoForm.invalid || !this.nombreImagen) {
      console.log('Formulario inválido');
      return;
    }


    const producto = {
      nombre: this.productoForm.value.nombre!,
      descripcion: this.productoForm.value.descripcion!,
      precio: this.productoForm.value.precio!,
      imagen: this.nombreImagen,
    };

    this.productosService.agregarProducto(producto).subscribe({
      next: () => {
        this.productoForm.reset();
        this.nombreImagen = '';

        const inputFile = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (inputFile) inputFile.value = '';
        
        this.productosService.fetchProductos();
      },
      error: (error: any) => {
        console.error('Error al agregar producto:', error);
      }
    });
  }

  eliminarProducto(id: string): void {
    if (!confirm('¿Seguro que deseas eliminar este producto?')) return;

    this.productosService.eliminarProducto(id).subscribe({
      next: () => {
        this.productosService.fetchProductos();
      },
      error: (error: any) => {
        console.error('Error al eliminar producto:', error);
      }
    });
  }


  /*
  const agregar = (this.productosService as any).agregarProducto;
  if (typeof agregar !== 'function') {
    console.error('ProductosService no implementa agregarProducto');
    return;
  }

  agregar.call(this.productosService, this.productoForm.value)
    .subscribe({
      next: () => {
        this.productoForm.reset();
        this.productosService.fetchProductos();
      },
      error: (error: any) => {
        console.log(error);
      }
    });*/
}


