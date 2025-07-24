import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  constructor(private httpClient: HttpClient) { }


  // method to call api and get all brands 
  getAllBrands(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/brands`)
  }
  // method to call api and get specific brands 
  getSpacificBrand(Id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/brands/${Id}`)
  }
}
