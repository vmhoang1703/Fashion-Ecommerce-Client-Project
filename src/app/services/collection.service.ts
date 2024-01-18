import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Collection } from '../models/collection';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private baseUrl = 'http://localhost:5000/api/collections';

  constructor(
    private http: HttpClient,
  ) { }

  getCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.baseUrl}`);
  }

  getCollectionImage(id: number): Observable<Blob> {
    const url = `${this.baseUrl}/image/${id}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  createCollection(collection: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, collection);
  }

  deleteCollection(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
