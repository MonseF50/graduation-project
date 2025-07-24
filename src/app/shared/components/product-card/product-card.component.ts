import { Component, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { IProducts } from '../../interfaces/iproducts';
import { RouterLink } from '@angular/router';
import AOS from 'aos';
import { isPlatformBrowser, NgClass, NgFor, NgIf } from '@angular/common';
import { ProgressBar } from 'primeng/progressbar';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastService } from '../../../core/services/toast/toast.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { WishListService } from '../../../core/services/wishList/wish-list.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, Toast, NgxSpinnerComponent, NgClass, NgIf, NgFor],
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
        // porperity to make spinner off 
        this.isProductAdd = false
        console.log(res);
        this.showSuccess(res.message)
      },
      error: (err) => {
        // porperity to make spinner off 
        this.isProductAdd = false
        console.log(err);
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
          this.showSuccess(res.message)
          console.log(res);
        },
        error: (err) => {
          console.log(err);

        }
      })
    } else {
      this.wishListService.removeProductFromWishlist(id).subscribe({
        next: (res) => {
          this.showSuccess(res.message)
          console.log(res);
        }, error: (err) => {
          console.log(err);

        }
      })
    }
  }

  // * method to show the success message after add the porduct to cart and wisht and remove form the wish list 
  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
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
