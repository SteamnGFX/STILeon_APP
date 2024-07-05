import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { CategoriasService } from '../services/categorias.service';
import { ICategory } from '../interfaces/category';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  nuevo: ICategory = {
    Id: 1,
    Name: "Escritorio"
  };

  listaProductos: any[] = [];
  listaCategorias: any[] = [];
  productosFiltrados: any[] = [];
  isResultLoadedProducto: boolean = false;
  isResultLoadedCategoria: boolean = false;
  filtroTexto: string = '';

  constructor(
    private _productosServicios: ProductosService,
    private _categoriaServicios: CategoriasService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  obtenerProductos() {
    this._productosServicios.getList().subscribe({
      next: (data) => {
        this.listaProductos = data;
        this.filtrarPorCategoria(); // Filtrar productos por categoría al cargar
        this.isResultLoadedProducto = true;
        console.log("Productos cargados:", this.listaProductos);
      },
      error: (ex) => {
        console.log("Error al cargar productos:", ex);
      }
    });
  }

  obtenerCategorias() {
    this._categoriaServicios.getList().subscribe({
      next: (data) => {
        this.listaCategorias = data;
        this.isResultLoadedCategoria = true;
        console.log("Categorías cargadas:", this.listaCategorias);
      },
      error: (ex) => {
        console.log("Error al cargar categorías:", ex);
      }
    });
  }

  aplicarFiltro() {
    this.productosFiltrados = this.listaProductos.filter(producto =>
      producto.name.toLowerCase().includes(this.filtroTexto.toLowerCase())
    );
  }

  filtrarPorCategoria() {
    const categoryId = Number(this.nuevo.Id); // Convertir a número
    if (categoryId) {
      this.productosFiltrados = this.listaProductos.filter(producto =>
        producto.categoryId === categoryId
      );
      console.log("FILTRO CATEGORIA");
      console.log(this.productosFiltrados);
    } else {
      this.productosFiltrados = this.listaProductos;
    }
  }
}
