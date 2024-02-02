import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getBestSellerProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/best-seller`);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getProductsByCollection(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products-by-collection/${id}`);
  }

  createProduct(productData: Product): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, productData);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  updateProduct(id: string, productData: Product): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, productData);
  }

  filterProduct(filters: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/filter`, filters);
  }
}
