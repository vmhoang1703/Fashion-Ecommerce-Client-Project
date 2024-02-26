import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VietnamService {
  private baseUrl = `${environment.baseURL}/api/vietnam`;

  constructor(private http: HttpClient) { }

  getProvinces(): Observable<any>{
    return this.http.get(`${this.baseUrl}/province`);
  }

  getDistricts(provinceId: string): Observable<any>{
    return this.http.get(`${this.baseUrl}/province/district/${provinceId}`);
  }

  getWards(districtId: string): Observable<any>{
    return this.http.get(`${this.baseUrl}/province/ward/${districtId}`);
  }
}
