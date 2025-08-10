import { Component, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { IProducts } from '../../interfaces/iproducts';
import { RouterLink } from '@angular/router';
import AOS from 'aos';
import { NgClass } from '@angular/common';
import { ProgressBar } from 'primeng/progressbar';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastService } from '../../../core/services/toast/toast.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishListService } from '../../../core/services/wishList/wish-list.service';
import { TosterngService } from '../../../core/services/toster/tosterng.service';
@Component({
  selector: 'app-product-card',
  imports: [RouterLink, Toast, NgClass],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  providers: [MessageService]
})
export class ProductCardComponent {
  @Input() product: IProducts | null = null;
  @Input() isPrgBarShown: boolean = false
  private ID = inject(PLATFORM_ID)
  private toastService = inject(ToastService)
  private cartService = inject(CartService)
  private ngxSpinner = inject(NgxSpinnerService)
  private wishListService = inject(WishListService)
  private tosterngService = inject(TosterngService)
  messageAdd: string | null = null
  // porperity to make spinner during the product add 
  isProductAdd: boolean = false
  constructor(private messageService: MessageService) { }

  // * method to show decsoun in product card 
  getDiscount(): number {
    let discount = Math.round((this.product!.priceAfterDiscount / this.product!.price) * 10)
    return discount
  }
  // * method to add porduct in cart 
  addProductToCart(id: string, event: MouseEvent) {
    event.stopPropagation()
    // porperity to make spinner during the product add on 
    this.isProductAdd = true
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.cartService.cartProdurctsNumber.set(res.numOfCartItems)
        this.cartService.productsCartPrice.set(res.data.totalCartPrice)
        // porperity to make spinner off 
        this.isProductAdd = false
        this.messageAdd = res.message

        this.messageService.add({
          severity: 'success',
          summary: 'Added to Cart',
          detail: 'The product was added successfully'
        });
      },
      error: (err) => {
        // porperity to make spinner off 
        this.isProductAdd = false
      }
    })
  }
  // * method to add porduct to wishList 
  addToWishList(id: string, event: MouseEvent) {
    event.stopPropagation()
    const element = event.currentTarget as HTMLElement
    const icon = element.children[0]
    element.classList.toggle('bg-primary!')
    icon.classList.toggle('text-white')
    if (element.classList.contains('bg-primary')) {
      this.wishListService.addProductToWishList(id).subscribe({
        next: (res) => {
          this.messageAdd = res.message
          this.showSuccess()
        },
        error: (err) => {
        }
      })
    } else {
      this.wishListService.removeProductFromWishlist(id).subscribe({
        next: (res) => {
          this.messageAdd = res.message
          this.showSuccess()
        }, error: (err) => {
        }
      })
    }
  }
  // * method to show the success message after add the porduct to cart and wisht and remove form the wish list 
  showSuccess() {
    if (this.messageAdd != null) {
      this.tosterngService.showSuccess('Sucess', this.messageAdd)
      // this.messageService.add({ severity: 'success', summary: 'Success', detail: this.messageAdd });
    }
  }
  getStarArray(rating: number): boolean[] {
    const fullStars = Math.round(rating);
    const maxStars = 5;
    const result: boolean[] = [];

    for (let i = 1; i <= maxStars; i++) {
      result.push(i <= fullStars);
    }

    return result;
  }
}
