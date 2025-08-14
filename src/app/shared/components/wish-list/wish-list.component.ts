import { erroresInterceptor } from './../../../core/interceptors/errores/errores.interceptor';
import { Component, computed, HostListener, inject, OnInit, Signal, signal } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { WishListService } from '../../../core/services/wishList/wish-list.service';
import { IProducts } from '../../interfaces/iproducts';
import { ToastService } from '../../../core/services/toast/toast.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wish-list',
  imports: [DrawerModule, RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss',
})
export class WishListComponent implements OnInit {
  private wishListService = inject(WishListService);
  private cartService = inject(CartService)
  visible: boolean = false
  wishListProducts: IProducts[] | null = null;
  wishlistProductsNumber: Signal<number> = computed(() => this.wishListService.wishCartProductNumber())
  ngOnInit(): void {
    this.callWishList();
  }
  callWishList(): void {
    this.wishListService.getLoggedUserWishList().subscribe({
      next: (res) => {
        this.wishListService.wishCartProductNumber.set(res.count);
        this.wishListProducts = res.data;

      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getWishListItems(): void {
    this.wishListService.getLoggedUserWishList().subscribe({
      next: (res) => {
        this.visible = true
        this.wishListProducts = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeFormWishList(id: string): void {
    this.wishListService.removeProductFromWishlist(id).subscribe({
      next: (res) => {
        this.callWishList()
        this.wishListService.wishCartProductNumber.set(res.count)
      },
      error: (err) => {
        console.log(err);
      }

    }
    );
  }
  addToProductCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.cartService.cartProdurctsNumber.set(res.numOfCartItems)
        this.removeFormWishList(id)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
