import { inject, Injectable } from '@angular/core';
import { Product } from '../../domains/auth/interfaces/product.interface';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductAPIService {

  private apiUrl = environment.fastAPIUrl
  private http = inject(HttpClient)

  updateProduct(product: Product):Observable<Product>{
    const url = `${this.apiUrl}/products`
    return this.http.put<Product>(url, product)
  }

  createProduct(product: Product): Observable<Product>{
    const url = `${this.apiUrl}/products`
    return this.http.post<Product>(url, product)
  }

  getProductbyId(id: number): Observable<Product>{
    const url = `${this.apiUrl}/products/getbyId/${id}`
    return this.http.get<Product>(url)
  }

  deletebyId(id: number): Observable<Product>{
    const url = `${this.apiUrl}/products/deletebyId/${id}`
    return this.http.delete<Product >(url)
  }

  getProductbyName(name: string):Observable<Product[]>{
    const url = `${this.apiUrl}/products/searchByName/${name}`
    return this.http.get<Product[]>(url)
  }

  getProductbyPrice(price: number):Observable<Product[]>{
    const url = `${this.apiUrl}/products/searchByPrice/${price}`
    return this.http.get<Product[]>(url)
  }

  getAllProducts():Observable<Product[]>{
    const url = `${this.apiUrl}/products/allProducts`
    return this.http.get<Product[]>(url)
  }

  getProductbyCategory(name: string):Observable<Product[]>{
    const url = `${this.apiUrl}/products/searchByCategory/${name}`
    return this.http.get<Product[]>(url)
  }

  getCategories()/*Observable<string[]>*/{
    /*const url = `${this.apiUrl}/products/categories`
    return this.http.get<Product[]>(url)*/

    const data = [
      { id: 1, name: 'appliances' },
      { id: 2, name: 'shoes'},
      { id: 3, name: 'technology'},
      { id: 4, name: 'clothing'},
      { id: 5, name: 'furniture'},
      { id: 6, name: 'books'},
      { id: 7, name: 'beauty'},
      { id: 8, name: 'sports'},
      { id: 9, name: 'toys'},
      { id: 10, name: 'automotive'},
      { id: 11, name: 'groceries'}

        ]

      return data
  }

}
