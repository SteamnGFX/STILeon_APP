import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {
  private _endpoint: string = environment.endPoint;
  private apiUrl: string = this._endpoint;

  constructor(private _http: HttpClient) { }

  getList(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(`${this.apiUrl}Product`);
  }
}
