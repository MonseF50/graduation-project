import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  wishCartProductNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor(private httpClient: HttpClient) { }

  addProductToWishList(Id: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/wishlist`,
      {
        "productId": Id
      }
    )
  }
  getLoggedUserWishList(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/wishlist`)
  }
  removeProductFromWishlist(Id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/wishlist/${Id}`)
  }
}
