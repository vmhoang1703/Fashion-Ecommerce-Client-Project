import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Collection } from '../models/collection';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private baseUrl = `${environment.baseURL}'/api/collections'`;

  constructor(private http: HttpClient) {}

  getCollections(): Observable<any> {
    return this.http.get<Collection[]>(this.baseUrl);
  }

  getCollectionImage(id: string): Observable<Blob> {
    const url = `${this.baseUrl}/image/${id}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  createCollection(collection: Collection): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, collection);
  }

  deleteCollection(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  getCollectionById(id: string): Observable<any> {
    return this.http.get<Collection>(`${this.baseUrl}/${id}`);
  }

  updateCollection(id: string, collection: Collection): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, collection);
  }
}
