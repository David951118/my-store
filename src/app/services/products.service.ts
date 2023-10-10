import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Product, updateProductDTO } from '../models/product.model';
import { catchError, throwError, map } from 'rxjs';
import { checkTime } from '../interceptors/time.interceptor';

import { environment } from 'src/enviroments/enviroment';


@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.API_URL}/products`;

  constructor(private http: HttpClient) {}

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl, { params, context: checkTime() })
    .pipe(
      map(products => products.map(item =>{
        return{
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error : HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict){
          return throwError('Algo salgo fallo en el servidor')
        }
        if (error.status === HttpStatusCode.NotFound){
          return throwError('producvto no existe')
        }
        if (error.status === HttpStatusCode.Unauthorized){
          return throwError('No esta autorizado ingreso')
        }
        return throwError('Algo salio mal')
      }))
  }

  getProductByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}/`, {
      params: { limit, offset },
    });
  }

  create(dto: Product) {
    return this.http.post<Product>(this.apiUrl, dto);
  }

  update(id: string, dto: updateProductDTO) {
    return this.http.patch<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
