import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { StarIcon } from 'primeng/icons';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartProdurctsNumber: WritableSignal<number> = signal(0)
  productsCartPrice: WritableSignal<number> = signal(0)


  constructor(private httpClient: HttpClient) {

  }


  // ? method to call api with the token and porduct id and add porduct to cart 
  addProductToCart(Id: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/cart`,
      {
        "productId": Id
      },
    )
  }
  // ? method to call api with the token to get all porduct in the cart 
  getLoggedUerCart(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/cart`,
    )
  }
  updateCartProductQuantity(Id: string, count: any): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/cart/${Id}`,
      {
        "count": count
      },
    )
  }
  deleteSpecificProduct(Id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/cart/${Id}`,

    )
  }
  clearAllCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/cart`,

    )
  }
}
