import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { CartResponse } from '../../shared/interfaces/cart/cart-respons';
import { CartData } from '../../shared/interfaces/cart/cart-data';
import { InputTextModule } from 'primeng/inputtext';
import { StarIcon } from 'primeng/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [InputTextModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService)
  cartData: CartData | null = null
  productCount: number | null = null
  ngOnInit(): void {
    this.getUserCart()
  }
  getUserCart(): void {
    this.cartService.getLoggedUerCart().subscribe({
      next: (res) => {
        this.cartData = res.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  updateProductQuinty(id: string, count: any): void {
    this.cartService.updateCartProductQuantity(id, count).subscribe({
      next: (res) => {
        this.cartData = res.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  deleteProduct(id: string): void {
    this.cartService.deleteSpecificProduct(id).subscribe(
      {
        next: (res) => {
          this.cartData = res.data
          this.cartService?.cartProdurctsNumber.set(res.numOfCartItems)
          this.cartService?.productsCartPrice.set(res.data.totalCartPrice)
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }
  clearCart(): void {
    this.cartService.clearAllCart().subscribe(
      {
        next: (res) => {
          if (res.message == 'success') {
            this.cartService?.cartProdurctsNumber.set(0)
            this.cartService?.productsCartPrice.set(0)

            this.cartData = null
          }
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

}
