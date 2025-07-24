import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }
  token = localStorage.getItem('userToken')!

  //* method to call api to payment py cash 
  createCashOrder(cartId: string, deatilsObj: FormGroup): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/orders/${cartId}`,
      {
        "shippingAddress": {
          deatilsObj
        }
      },
      {
        headers: {
          token: this.token
        }
      }
    )
  }
  //* method to call api to payment py vesia 
  CheckOutSession(cartId: string, deatilsObj: FormGroup): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/orders/checkout-session/${cartId}?url=${window.location.origin}`,
      {
        "shippingAddress": deatilsObj
      }
      , {
        headers: {
          token: this.token
        }
      }
    )
  }
  // * method to get all orders after the payment 
  getUserAllOrders(Id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/orders/user/${Id}`)
  }
  getUserOrders(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}`)
  }
}
