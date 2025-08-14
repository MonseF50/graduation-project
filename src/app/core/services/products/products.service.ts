import { QueryParamsHandling } from './../../../../../node_modules/ngx-owl-carousel-o/lib/carousel/owl-router-link.directive.d';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { materialize, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UntypedFormBuilder } from '@angular/forms';
import { passwordMatch } from '../../../pages/register/passwordMath';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly httpclient: HttpClient) { }

  getProducts(catID?: string, page?: number, minPrice?: number, maxPrice?: number, sort?: string, limit: string = '12'): Observable<any> {
    let params = new HttpParams()
    if (catID != undefined) {
      params = params.set('category[in]', catID)
    }
    if (page != undefined) {
      params = params.set('page', page.toString())
    }
    if (minPrice != undefined) {
      params = params.set('price[gte]', minPrice.toString())
    }
    if (maxPrice != undefined) {
      params = params.set('price[lte]', maxPrice.toString())
    }
    if (sort != undefined) {
      params = params.set('sort', sort)
    }
    if (limit != undefined) {
      params = params.set('limit', limit)
    }
    return this.httpclient.get(`${environment.baseUrl}/products`, { params })
  }
  getSpecificProducts(id: string | number): Observable<any> {
    return this.httpclient.get(`${environment.baseUrl}/products/${id}`)
  }
}
