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

  getProducts(catID?: string, page?: number, minPrice?: number, maxPrice?: number, brand?: string, sort: string = 'price'): Observable<any> {
    let params = new HttpParams().set('sort', sort).set('limit', '12')
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
    if (brand != undefined) {
      params = params.set('brand', brand)
    }
    return this.httpclient.get(`${environment.baseUrl}/products`, { params })
  }
  getSpecificProducts(id: string | number): Observable<any> {
    return this.httpclient.get(`${environment.baseUrl}/products/${id}`)
  }
}
