import { inject, Injectable } from '@angular/core';
import { Product, ProductResponse } from '../../domains/auth/interfaces/product.interface';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductAPIService {

  apiUrl = environment.fastAPIUrl
  http = inject(HttpClient)

  updateProduct(product: ProductResponse):Observable<ProductResponse>{
    const url = `${this.apiUrl}/products`
    return this.http.put<ProductResponse>(url, product)
  }

  createProduct(product: Product): Observable<ProductResponse>{
    const url = `${this.apiUrl}/products`
    return this.http.post<ProductResponse>(url, product)
  }

  getProductbyId(id: number): Observable<ProductResponse>{
    const url = `${this.apiUrl}/products/getbyId/${id}`
    return this.http.get<ProductResponse>(url)
  }

  deletebyId(id: string): Observable<any>{
    const url = `${this.apiUrl}/products/deletebyId/${id}`
    return this.http.delete<any>(url)
  }

  getProductbyName(name: string):Observable<ProductResponse[]>{
    const url = `${this.apiUrl}/products/searchByName/${name}`
    return this.http.get<ProductResponse[]>(url)
  }

  getAllProducts():Observable<ProductResponse[]>{
    const url = `${this.apiUrl}/products/allProducts`
    return this.http.get<ProductResponse[]>(url)
  }

}
