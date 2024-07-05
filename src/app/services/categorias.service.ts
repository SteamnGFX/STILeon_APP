import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../interfaces/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private _endpoint: string = environment.endPoint;
  private apiUrl: string = this._endpoint;

  constructor(private _http: HttpClient) { }

  getList(): Observable<ICategory[]> {
    return this._http.get<ICategory[]>(`${this.apiUrl}Category`);
  }
}
