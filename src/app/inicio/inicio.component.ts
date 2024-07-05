import { Component } from '@angular/core';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  listaProductos: any[] = [];
  isResultLoadedProducto: boolean = false;
  filtroTexto: string = '';

  constructor(
    private _productosServicios: ProductosService  ) {}

  

  obtenerProductos() {
    this._productosServicios.getList().subscribe({
      next: (data) => {
        this.listaProductos = data;
        this.isResultLoadedProducto = true;
        console.log("Productos cargados:", this.listaProductos);
      },
      error: (ex) => {
        console.log("Error al cargar productos:", ex);
      }
    });
  }
}
